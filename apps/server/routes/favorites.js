const express = require("express");
const router = express.Router();
const {prisma} = require("db");

/**
 * get user favorites
 * add favorite
 * remove favorite
 * delete favorites?
 */

router.get("/", async (req, res) => {
    // console.log(req.params);
    const user_id = req.session.user.id;

    if (!user_id) {
        return res.status(401).send({ 
            message: "not authenticated",
            success: false
        });
    }
    
    const favorites = await prisma.favorite.findMany({
        where: {
            userId: user_id,
        },
        include: {
            event: true,
        },
    });

    return res.json({
        favorites,
        success: true
    });
});

router.post("/", async (req, res) => {
    const user_id = req.session.user.id;
    let { tag, url, date, title, location } = req.body;
    // console.log(req.body);

    if (!user_id) {
        return res.status(401).send({ 
            message: "not authenticated",
            success: false 
        });
    }

    if (!tag || !url || !date || !title || !location) {
        return res.status(400).send({ 
            message: "tag, url, date, title, location are required",
            success: false
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: user_id,
        },
    });

    if (!user) {
        return res.status(400).send({ 
            message: "user does not exist",
            success: false
        });
    }

    date = new Date(date);

    const existingEvent = await prisma.event.findFirst({
        where: {
            tag,
            url,
            date,
            title,
            location,
        },
    });

    if (existingEvent) {

        let favorite = await prisma.favorite.findFirst({
            where: {
                userId: user_id,
                eventId: existingEvent.id,
            },
        });

        if (!favorite) {
            favorite = await prisma.favorite.create({
                data: {
                    userId: user.id,
                    eventId: existingEvent.id,
                },
            });
        }
            
        return res.status(200).send({
            message: "favorite added",
            favorite,
            success: true
        });
    }

    const createdEvent = await prisma.event.create({
        data: {
            tag,
            url,
            date,
            title,
            location
        },
    });

    let favorite = await prisma.favorite.findFirst({
        where: {
            userId: user_id,
            eventId: createdEvent.id,
        },
    });

    if (!favorite) {
        favorite = await prisma.favorite.create({
            data: {
                userId: user.id,
                eventId: createdEvent.id,
            },
        });
    }

    return res.status(200).send({
        message: "favorite cached and added",
        favorite,
        success: true
    });

});

router.delete("/:favorite_id", async (req, res) => {
    const { favorite_id } = req.params;
    const user_id = req.session.user.id;

    if (!user_id) {
        return res.status(401).send({
            message: "not authenticated",
            success: false
        });
    }

    if (!favorite_id) {
        return res.status(400).send({ 
            message: "favorite_id are required",
            success: false
        });
    }

    const favorite = await prisma.favorite.findFirst({
        where: {
            id: favorite_id,
        },
    });

    if (!favorite) {
        return res.status(400).send({ 
            message: "favorite does not exist",
            success: false 
        });
    }

    await prisma.favorite.delete({
        where: {
            id: favorite_id,
        },
    });

    return res.status(200).send({ 
        message: "favorite deleted",
        success: true
    });
});

module.exports = router;
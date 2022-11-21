const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");

/**
 * get user favorites
 * add favorite
 * remove favorite
 * delete favorites?
 */

router.get("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    // console.log(req.params);

    if (!user_id) {
        return res.status(400).send({ message: "user_id is required" });
    }
    
    const favorites = await prisma.favorite.findMany({
        where: {
            userId: user_id,
        },
    });

    return res.send(favorites);
});

router.post("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    let { tag, url, date, title, location } = req.body;
    // console.log(req.body);

    if (!user_id) {
        return res.status(400).send({ message: "user_id is required" });
    }

    if (!tag || !url || !date || !title || !location) {
        return res.status(400).send({ message: "tag, url, date, title, location are required" });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: user_id,
        },
    });

    if (!user) {
        return res.status(400).send({ message: "user does not exist" });
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
    });

});

module.exports = router;
const { convertZipcode } = require("./zipcodeConverter");
const { prisma } = require("db");
const { genericLinks } = require("../generic_links");

const getGenericLinks = async (zipcode, user) => {
  let zipcodeData = await convertZipcode(zipcode);
  // let genericLinks = JSON.parse(fs.readFileSync(jsonPath).toString());
  let genericLinksZipcoded = [];
  for (let i = 0; i < genericLinks.length; i++) {
		{/*
    WARNING: EXPERIMENTAL CODE:
    This is for the favorites feature. It is not working yet (fully)
    
    let favoriteId = null;

    if (user) {
      const event = await prisma.event.findFirst({
        where: {
          url: genericLinks[i].url,
          title: genericLinks[i].title,
        },
      });

      if (event) {
        const prismaUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            favorites: {
              include: { event: true },
            },
          },
        });

        prismaUser.favorites.find((favorite) => {
          if (favorite.event.id === event.id) {
            favoriteId = favorite.id;
          }
        });
      }
    }
	*/}
    genericLinks[i].url = `${genericLinks[i].url}${zipcode}`;
		genericLinks[i].image = `https://picsum.photos/seed/${i + Math.random() *1000}/2000/2000`
    genericLinks[i].location = {
      city: zipcodeData["city"],
      country: zipcodeData["country"],
      postalCode: zipcode,
      region: zipcodeData["state"],
      virtual: false,
    };
    genericLinksZipcoded.push(genericLinks[i]);
  }
  return genericLinksZipcoded;
};

module.exports = { getGenericLinks };

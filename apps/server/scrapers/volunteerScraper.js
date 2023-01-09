const fetch = require("node-fetch");
const { prisma } = require("db");
const axios = require("axios");

const getVolunteering = async (zipcode, user) => {
  let dataList = [];

  let response = await axios.post(
    "https://www.volunteermatch.org/s/srp/search",
    `{"query":"query {\\nsearchSRP(input:{\\nreturnVirtualAndOnSiteOpps: true\\nlocation: \\"${zipcode}\\"\\nvirtual: false\\ncategories: []\\nskills: []\\nradius: \\"20\\"\\ngreatFor: []\\nspecialFlag: \\"\\"\\nkeywords: []\\npageNumber: 1\\nsortCriteria: null\\nnumberOfResults: 25\\n}){\\nnumberOfResults\\nresultsSize\\noriginalResultSize\\ncurrentPage\\nsortCriteria\\nhasDistanceCriteria\\ntopCity\\ntotalVolunteersNeeded\\ncityLocation\\nsrpOpportunities{\\ndetail {\\ncategories\\nid\\nlocation {\\ncity\\ncountry\\npostalCode\\nregion\\nvirtual\\n}\\nparentOrg {\\nid\\nname\\n}\\nshifts {\\nid\\n}\\ntitle\\nurl\\n}\\ndateRange {\\nendDate\\nendTime\\nongoing\\nsingleDayOpps\\nstartDate\\nstartTime\\n}\\ndistance\\nparentOrgOppCount\\nplaintextDescription\\npostDate\\npremiumOrg\\n}}}","location":"${zipcode}","radius":"20"}`,
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Referer: `https://www.volunteermatch.org/search/?l=${zipcode}`,
        "Referer-Policy": "strict-origin-when-cross-origin",
        mode: "cors",
      },
    }
  );
  let opps = response.data.data.searchSRP.srpOpportunities;
  let oppsCount = response.data.data.searchSRP.numberOfResults;

  for (let i = 0; i < oppsCount; i++) {

    {/*
    WARNING: EXPERIMENTAL CODE:
    This is for the favorites feature. It is not working yet (fully)
    

    let favoriteId = null;

    if (user) {
      const event = await prisma.event.findFirst({
        where: {
          AND: [{ url: opps[i].detail.url }, { title: opps[i].detail.title }],
        },
      });

      if (event) {
        console.log(event);
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
            console.log(`${event.id} - ${favorite.event.id}`)
            favoriteId = favorite.id;
          }
        });
      }
    }
    */}
    dataList.push({
      title: opps[i].detail.title,
      url: opps[i].detail.url,
      location: opps[i].detail.location,
      date: {
        startDate: opps[i].dateRange.startDate,
        endDate: opps[i].dateRange.endDate,
      },
      tag: "Volunteering",
      image: `https://picsum.photos/seed/${Math.random() *1000}/2000/2000`
    });
  }
  return dataList;
};

module.exports = { getVolunteering };

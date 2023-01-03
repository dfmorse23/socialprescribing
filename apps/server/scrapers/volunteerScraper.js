const fetch = require("node-fetch");
const { getImage } = require("./getImage");

const getVolunteering = (zipcode) => {
  return new Promise(async (resolve, reject) => {
    fetch("https://www.volunteermatch.org/s/srp/search", {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: `https://www.volunteermatch.org/search/?l=${zipcode}`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{"query":"query {\\nsearchSRP(input:{\\nreturnVirtualAndOnSiteOpps: true\\nlocation: \\"${zipcode}\\"\\nvirtual: false\\ncategories: []\\nskills: []\\nradius: \\"20\\"\\ngreatFor: []\\nspecialFlag: \\"\\"\\nkeywords: []\\npageNumber: 1\\nsortCriteria: null\\nnumberOfResults: 25\\n}){\\nnumberOfResults\\nresultsSize\\noriginalResultSize\\ncurrentPage\\nsortCriteria\\nhasDistanceCriteria\\ntopCity\\ntotalVolunteersNeeded\\ncityLocation\\nsrpOpportunities{\\ndetail {\\ncategories\\nid\\nlocation {\\ncity\\ncountry\\npostalCode\\nregion\\nvirtual\\n}\\nparentOrg {\\nid\\nname\\n}\\nshifts {\\nid\\n}\\ntitle\\nurl\\n}\\ndateRange {\\nendDate\\nendTime\\nongoing\\nsingleDayOpps\\nstartDate\\nstartTime\\n}\\ndistance\\nparentOrgOppCount\\nplaintextDescription\\npostDate\\npremiumOrg\\n}}}","location":"${zipcode}","radius":"20"}`,
      method: "POST",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        let opps = data["data"]["searchSRP"]["srpOpportunities"];
        let oppsCount = opps.length;
        let dataList = [];

        for (let i = 0; i < oppsCount; i++) {
          dataList.push({
            title: opps[i]["detail"]["title"],
            url: opps[i]["detail"]["url"],
            location: opps[i]["detail"]["location"],
            date: {
              startDate: opps[i]["dateRange"]["startDate"],
              endDate: opps[i]["dateRange"]["endDate"],
            },
            tag: "Volunteering",
            image: null,
          });

          resolve({ Volunteering: dataList });
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

module.exports = { getVolunteering };

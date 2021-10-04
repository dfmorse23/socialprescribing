const fetch = require("node-fetch");
const { getImage } = require("./getImage");

const getEvents = (zipcode) => {
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

				// Get image urls from unsplash
				getImage(oppsCount)
					.then((imageUrls) => {
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
								image:
									imageUrls[i] ||
									"https://images.unsplash.com/photo-1461532257246-777de18cd58b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
							});
						}
					})
					.catch((err) => {
						reject(err.message);
					});

				resolve({ Volunteering: dataList });
			})
			.catch((err) => {
				reject(err.message);
			});
	});
};

module.exports = { getEvents: getEvents };

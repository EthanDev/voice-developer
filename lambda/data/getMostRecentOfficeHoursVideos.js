const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getMostRecentOfficeHoursVideos(maximum) {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/OfficeHours?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE())&maxRecords=${maximum}&sort%5B0%5D%5Bfield%5D=Published&sort%5B0%5D%5Bdirection%5D=desc`;
    const options = {
        method: "GET",
    };
    //console.log(`FULL PATH ${url}`);

    return fetch(url, options)
        .then((res) => res.json())
        .then((r) => {
            return r.records;
        });
}

module.exports = getMostRecentOfficeHoursVideos;
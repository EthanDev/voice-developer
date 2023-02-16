const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getVideoByDate(date) {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/OfficeHours?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE(),IF(3%3DDAY(Published)),IF(1%3DMONTH(Published)))`;
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

module.exports = getVideoByDate;
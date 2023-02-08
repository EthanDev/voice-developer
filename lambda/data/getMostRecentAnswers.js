const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getMostRecentAnswers() {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Answer?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE())`;
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

module.exports = getMostRecentAnswers;
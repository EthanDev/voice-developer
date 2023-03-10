const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getMostRecentAnswers(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const locale = helper.getLocale(handlerInput);
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Answer?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE(),FIND(%22${locale}%22%2C+Locale)!%3D0)`;
    const options = {
        method: "GET",
    };
    console.log(`FULL PATH ${url}`);

    return fetch(url, options)
        .then((res) => res.json())
        .then((r) => {
            return r.records;
        });
}

module.exports = getMostRecentAnswers;
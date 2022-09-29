const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getSoundEffect(spokenWords, locale) {
    const spokenWordsArray = spokenWords.split(" ");
    var findQuery = "";
    for (var i=0;i<spokenWordsArray.length;i++) {
        findQuery += `,FIND('${spokenWordsArray[i]}',LOWER(AlexaSlotJSON))`
    }
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/SoundEffect?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE()${findQuery})`;
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

module.exports = getSoundEffect;
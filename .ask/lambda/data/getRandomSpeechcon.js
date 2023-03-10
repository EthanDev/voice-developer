const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getRandomSpeechcon(locale, category) {
  //TODO: We should keep track of which speechcons a user has heard, so that when they ask for one randomly, we give them one they've never heard before.
  const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Speechcon?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE(),FIND(%22${locale}%22%2C+Locale)!%3D0,FIND(%22${locale}%22%2C+Locale)!%3D0)`;
  const options = {
    method: "GET",
  };
  //console.log(`FULL PATH ${url}`);

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
      const item = helper.getRandomItem(r.records);
      return item.fields.Name;
    });
}

module.exports = getRandomSpeechcon;
const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getRandomSpeechconByCategory(locale, type) {
  //TODO: This query doesn't bring back results that are filtered for the indicated category.  What's up with that?
  const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Speechcon?filterByFormula=AND(IsDisabled%3DFALSE(),FIND(%22${locale}%22%2C+Locale)!%3D0,FIND(%22${type}%22%2C+Type)!%3D0)`;
  const options = {
    method: "GET",
    authorization: `Bearer ${keys.airtable_personal_access_token}`
  };
  console.log(`FULL PATH ${url}`);

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
      const item = helper.getRandomItem(r.records);
      return item.fields.Name;
    });
}

module.exports = getRandomSpeechconByCategory;
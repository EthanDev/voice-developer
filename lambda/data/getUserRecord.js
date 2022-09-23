const Airtable = require("airtable");
const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

function getUserRecord(handlerInput) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  const userId = handlerInput.requestEnvelope.context.System.user.userId;

  const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/User?api_key=${keys.airtable_api_key  }&filterByFormula=%7BUserId%7D%3D%22${encodeURIComponent(userId)}%22`;
  const options = {method: "GET"};

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
      if (r.records.length === 0) {
        sessionAttributes.isFirstTime = true;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return createUserRecord(userId);
      } else return r.records[0];
    });
}

function createUserRecord(userId) {
  var airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
  return new Promise((resolve, reject) => {
    airtable("User").create({ UserId: userId }, function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      resolve(record);
    });
  });
}

module.exports = getUserRecord;

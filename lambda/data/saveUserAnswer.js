const Airtable = require("airtable");
const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function saveUserAnswer(answerId, handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const locale = helper.getLocale(handlerInput);
    const userRecordId = sessionAttributes.user.RecordId;
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/UserAnswer?api_key=${keys.airtable_api_key}&filterByFormula=AND(FIND(%22${userRecordId}%22%2C+User)!%3D0,FIND(%22${answerId}%22%2C+Answer)!%3D0)`;
    //console.log(`FULL PATH ${url}`);
    const options = {method: "GET",};

    return fetch(url, options)
        .then((res) => res.json())
        .then((r) => {
            if (r.records.length === 0) {
                    return createUserAnswerRecord(answerId, userRecordId);
                }
            return r.records[0];
        });
}

function createUserAnswerRecord(answerId, userId) {
    var airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("UserAnswer").create(
            { User: [userId], Answer: [answerId] },
            function (err, record) {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(record);
            });
    });
}

module.exports = saveUserAnswer;
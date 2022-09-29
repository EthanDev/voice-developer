const Airtable = require("airtable");
const helper = require("../helper");
const keys = require("./keys");

async function saveMissedAnswer(answer, handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const userId = sessionAttributes.user.RecordId;
    var airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("MissedAnswer").create(
            { User: [userId], Value: answer },
            function (err, record) {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(record);
            });
    });
}

module.exports = saveMissedAnswer;
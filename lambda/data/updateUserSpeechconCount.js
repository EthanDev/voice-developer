const Airtable = require('airtable');
const keys = require("./keys");
const checkSpeechconAchievements = require("./checkSpeechconAchievements");


async function updateUserSpeechconCount(handlerInput, count) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    var newTotal = sessionAttributes.user.SpeechconCount + count;

    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "SpeechconCount": newTotal
        }
    }], function(err, records) {});

    var achievementSpeech = await checkSpeechconAchievements(handlerInput, newTotal);
    return achievementSpeech;
}

module.exports = updateUserSpeechconCount;
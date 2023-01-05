const Airtable = require('airtable');
const keys = require("./keys");
//TODO: const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");


async function updateUserProsodyRate(handlerInput, rate) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    if (rate === undefined) rate = "";
    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "ProsodyRate": rate
        }
    }], function(err, records) {});

    //var achievementSpeech = await checkSoundEffectAchievements(handlerInput, newTotal);
    return rate;
}

module.exports = updateUserProsodyRate;
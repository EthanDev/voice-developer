const Airtable = require('airtable');
const keys = require("./keys");
const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");


async function updateUserSoundEffectCount(handlerInput, count) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    var newTotal = sessionAttributes.user.SoundEffectCount + count;

    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "SoundEffectCount": newTotal
        }
    }], function(err, records) {});

    var achievementSpeech = await checkSoundEffectAchievements(handlerInput, newTotal);
    return achievementSpeech;
}

module.exports = updateUserSoundEffectCount;
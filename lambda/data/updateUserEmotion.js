const Airtable = require('airtable');
const keys = require("./keys");
//TODO: const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");


async function updateUserEmotion(handlerInput, emotion) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "Emotion": emotion
        }
    }], function(err, records) {});

    //var achievementSpeech = await checkSoundEffectAchievements(handlerInput, newTotal);
    return emotion;
}

module.exports = updateUserEmotion;
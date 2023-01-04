const Airtable = require('airtable');
const keys = require("./keys");
//TODO: const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");


async function updateUserVoice(handlerInput, voice) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    if (voice === undefined) voice = "";
    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "PollyVoice": voice
        }
    }], function(err, records) {});

    //var achievementSpeech = await checkSoundEffectAchievements(handlerInput, newTotal);
    return voice;
}

module.exports = updateUserVoice;
const Airtable = require('airtable');
const keys = require("./keys");
//TODO: const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");


async function updateUserEmphasis(handlerInput, emphasis) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    if (emphasis === undefined) emphasis = "";
    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "Emphasis": emphasis
        }
    }], function(err, records) {});

    //var achievementSpeech = await checkSoundEffectAchievements(handlerInput, newTotal);
    return emphasis;
}

module.exports = updateUserEmphasis;
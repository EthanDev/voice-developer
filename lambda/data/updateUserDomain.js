const Airtable = require('airtable');
const keys = require("./keys");
//TODO: const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");


async function updateUserDomain(handlerInput, domain) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var airtable = new Airtable({apiKey: keys.airtable_api_key}).base(keys.airtable_base_data);

    if (domain === undefined) domain = "";
    airtable('User').update([
    {
        "id": sessionAttributes.user.RecordId,
        "fields": {
            "Domain": domain
        }
    }], function(err, records) {});

    //var achievementSpeech = await checkSoundEffectAchievements(handlerInput, newTotal);
    return domain;
}

module.exports = updateUserDomain;
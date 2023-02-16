const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function PollyVoiceIntent(handlerInput) {

    //TODO: Don't show the SSML syntax when the user is going back to Alexa's voice.
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var spokenVoice = helper.getSpokenWords(handlerInput, "voice");
    var resolvedVoice = helper.getResolvedWords(handlerInput, "voice");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    var normal = await data.getRandomSpeech("NORMAL", helper.getLocale(handlerInput));

    if (resolvedVoice === undefined) {
        if (spokenEmotion != undefined) {
            var voiceApology = await data.getRandomSpeech("VOICEAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = `${voiceApology.replace("SPOKENWORDS", spokenVoice)} ${actionQuery}`;
        }
    }
    else {
        var voice = resolvedVoice[0].value.name;
        var voiceValue = voice;
        if (voiceValue === normal) voiceValue = undefined;
        var [voiceConfirmation, userVoice] = await Promise.all([
            data.getRandomSpeech("VOICECONFIRMATION", helper.getLocale(handlerInput)),
            data.updateUserVoice(handlerInput, voiceValue)
        ]);
        sessionAttributes.user.PollyVoice = voiceValue;
        if (voice != normal) {
            speakOutput = `<voice name="${voice}">${voiceConfirmation.replace("VOICE", voice)} ${actionQuery}</voice>`;
            var achievementName = `VOICE${voice.toUpperCase()}`
            speakOutput = (await data.awardSpecificAchievement(achievementName, handlerInput)) + " " + speakOutput;
        }
        else {
            speakOutput = `${voiceConfirmation.replace("VOICE", voice)} ${actionQuery}`;
            speakOutput = await data.awardSpecificAchievement("VOICEALEXA", handlerInput) + " " + speakOutput;
        }
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        //TODO: APL!
        .withSimpleCard(`SSML VOICE TAG FOR ${sessionAttributes.user.PollyVoice}`, `<voice name="${sessionAttributes.user.PollyVoice}">...</voice>`)
        .getResponse();
}

module.exports = PollyVoiceIntent;
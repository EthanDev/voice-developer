const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function PollyVoiceIntent(handlerInput) {
    var spokenVoice = helper.getSpokenWords(handlerInput, "voice");
    var resolvedVoice = helper.getResolvedWords(handlerInput, "voice");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    var normal = await data.getRandomSpeech("NORMAL", helper.getLocale(handlerInput));

    if (resolvedVoice === undefined) {
        if (spokenEmotion != undefined) {
            var voiceApology = await data.getRandomSpeech("VOICEAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = `${voiceApology.replace("SPOKENWORDS", spokenVoice)}<break time='.5s'/>${actionQuery}`;
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
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.user.PollyVoice = voiceValue;
        if (voice != normal) {
            speakOutput = `<voice name="${voice}">${voiceConfirmation.replace("VOICE", voice)}<break time='.5s'/>${actionQuery}</voice>`;
        }
        else speakOutput = `${voiceConfirmation.replace("VOICE", voice)}<break time='.5s'/>${actionQuery}`;
        
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = PollyVoiceIntent;
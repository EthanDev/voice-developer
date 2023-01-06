const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

//TODO: Make sure that your list of voices in the Interaction Model matches the entire list on https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#voice


async function PollyVoiceIntent(handlerInput) {
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
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
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
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = PollyVoiceIntent;
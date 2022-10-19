const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function EmotionIntent(handlerInput) {
    var spokenEmotion = helper.getSpokenWords(handlerInput, "emotion");
    var resolvedEmotion = helper.getResolvedWords(handlerInput, "emotion");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    var normal = await data.getRandomSpeech("NORMAL", helper.getLocale(handlerInput));

    if (resolvedEmotion === undefined) {
        if (spokenEmotion != undefined) {
            var emotionApology = await data.getRandomSpeech("EMOTIONAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = `${emotionApology.replace("SPOKENWORDS", spokenEmotion)}<break time='.5s'/>${actionQuery}`;
        }
    }
    else {
        var emotion = resolvedEmotion[0].value.name;
        var emotionValue = emotion;
        if (emotionValue === normal) emotionValue = undefined;
        var [emotionConfirmation, userEmotion] = await Promise.all([
            data.getRandomSpeech("EMOTIONCONFIRMATION", helper.getLocale(handlerInput)),
            data.updateUserEmotion(handlerInput, emotionValue)
        ]);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.user.Emotion = emotionValue;
        if (emotion != normal) {
            speakOutput = `<amazon:emotion name="${emotion}" intensity="high">${emotionConfirmation.replace("EMOTION", emotion)}<break time='.5s'/>${actionQuery}</amazon:emotion>`;
        }
        else speakOutput = `${emotionConfirmation.replace("EMOTION", emotion)}<break time='.5s'/>${actionQuery}`;
        
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = EmotionIntent;
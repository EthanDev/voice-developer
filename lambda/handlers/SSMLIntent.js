const data = require("../data");
const helper = require("../helper");

async function SSMLIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    var [speakOutput, actionQuery, normal] = await Promise.all([
        data.getRandomSpeech("SSMLDESCRIPTION", helper.getLocale(handlerInput)),
        data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput)),
        data.getRandomSpeech("NORMAL", helper.getLocale(handlerInput))
    ]);
    
    if (sessionAttributes.user.Domain != undefined) speakOutput = `${speakOutput.replace("DOMAIN", sessionAttributes.user.Domain)} ${actionQuery}`;
    else speakOutput = speakOutput.replace("DOMAIN", normal);

    if (sessionAttributes.user.Emotion != undefined) speakOutput = `${speakOutput.replace("EMOTION", sessionAttributes.user.Emotion)} ${actionQuery}`;
    else speakOutput = speakOutput.replace("EMOTION", normal);

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = SSMLIntent;

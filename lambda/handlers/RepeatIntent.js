const data = require("../data");
const helper = require("../helper");

async function RepeatIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speakOutput = await data.checkIntentAchievements(handlerInput, "REPEATINTENT");

    return handlerInput.responseBuilder
        .speak(`${speakOutput} ${sessionAttributes.previousSpeak}`)
        .reprompt(sessionAttributes.previousReprompt)
        .getResponse();
}

module.exports = RepeatIntent;

const data = require("../data");
const helper = require("../helper");

async function LaunchRequest(handlerInput) {
    // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    // helper.setAction(handlerInput, `LAUNCHREQUEST`);
    // const locale = helper.getLocale(handlerInput);

    var speakOutput = `Welcome, Voice Developer. What can I help you with? You can hear any speechcon or sound effect, or ask me questions about specific Alexa development topics.`;
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = LaunchRequest;
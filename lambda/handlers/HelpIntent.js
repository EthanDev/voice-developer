const data = require("../data");
const helper = require("../helper");

async function HelpIntent(handlerInput) {
    var speakOutput = await data.getRandomSpeech("HELP", helper.getLocale(handlerInput));
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

  return handlerInput.responseBuilder
    .speak(`${speakOutput} ${actionQuery}`)
    .reprompt(actionQuery)
    .getResponse();
}

module.exports = HelpIntent;

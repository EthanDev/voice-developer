const data = require("../data");
const helper = require("../helper");

async function LaunchRequest(handlerInput) {
  // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  // helper.setAction(handlerInput, `LAUNCHREQUEST`);
  // const locale = helper.getLocale(handlerInput);

  var speakOutput = await data.getRandomSpeech("WELCOME", helper.getLocale(handlerInput));;
  var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

  return handlerInput.responseBuilder
    .speak(`${speakOutput} ${actionQuery}`)
    .reprompt(actionQuery)
    .getResponse();
}

module.exports = LaunchRequest;

const data = require("../data");
const helper = require("../helper");
const clocktest = require("../apl/clocktest.json");

async function LaunchRequest(handlerInput) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  // helper.setAction(handlerInput, `LAUNCHREQUEST`);
  // const locale = helper.getLocale(handlerInput);

  var speakOutput = "";
  if (sessionAttributes.isFirstTime) speakOutput = await data.getRandomSpeech("WELCOMEFIRST", helper.getLocale(handlerInput));
  else speakOutput = await data.getRandomSpeech("WELCOME", helper.getLocale(handlerInput));
  var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

  return handlerInput.responseBuilder
    .speak(`${speakOutput} ${actionQuery}`)
    .reprompt(actionQuery)
    .addDirective(clocktest)
    .getResponse();
}

module.exports = LaunchRequest;

const data = require("../data");
const helper = require("../helper");
//const clocktest = require("../apl/clocktest.json");

async function LaunchRequest(handlerInput) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  // helper.setAction(handlerInput, `LAUNCHREQUEST`);
  // const locale = helper.getLocale(handlerInput);

  var speakOutput = "";
  if (sessionAttributes.isFirstTime) speakOutput = await data.getRandomSpeech("WELCOMEFIRST", helper.getLocale(handlerInput));
  else speakOutput = await data.getRandomSpeech("WELCOME", helper.getLocale(handlerInput));

  var [actionQuery, recommendation] = await Promise.all([
    data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput)),
    data.getRandomSpeech("RECOMMENDATION", helper.getLocale(handlerInput))
  ]);

  //console.log(clocktest);

  return handlerInput.responseBuilder
    .speak(`${speakOutput} ${recommendation} ${actionQuery}`)
    .reprompt(actionQuery)
    //.addDirective(clocktest) //"ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvqxyz 1234567890 !@#$%^&*()",
    .getResponse();
}

module.exports = LaunchRequest;

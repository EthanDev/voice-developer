const data = require("../data");
const helper = require("../helper");
//const clocktest = require("../apl/clocktest.json");

async function ScoreboardIntent(handlerInput) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  var speakOutput = "This is the scoreboard intent.  You're not in first place.";
  var actionQuery = "What can we do next?"

  return handlerInput.responseBuilder
    .speak(`${speakOutput}${actionQuery}`)
    .reprompt(actionQuery)
    //.addDirective(dynamicEntitiesDirective)
    .getResponse();
}

module.exports = ScoreboardIntent;

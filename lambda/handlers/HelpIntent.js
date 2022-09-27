const data = require("../data");
const helper = require("../helper");

async function HelpIntent(handlerInput) {
    var [speakOutput, actionQuery, achievementSpeech] = await Promise.all([
        await data.getRandomSpeech("HELP", helper.getLocale(handlerInput)),
        await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput)),
        await data.checkIntentAchievements(handlerInput, "HELPINTENT")
    ]);
    speakOutput += achievementSpeech;

  return handlerInput.responseBuilder
    .speak(`${speakOutput} ${actionQuery}`)
    .reprompt(actionQuery)
    .getResponse();
}

module.exports = HelpIntent;

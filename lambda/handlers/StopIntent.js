const data = require("../data");
const helper = require("../helper");

async function StopIntent(handlerInput) {
    speakOutput = await data.getRandomSpeech("GOODBYE", helper.getLocale(handlerInput));

  return handlerInput.responseBuilder
    .speak(`${speakOutput} <audio src="soundbank://soundlibrary/machines/power_up_down/power_up_down_11"/>`)
    .getResponse();
}

module.exports = StopIntent;

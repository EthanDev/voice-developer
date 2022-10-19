const data = require("../data");
const helper = require("../helper");

async function BreakIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    var speakOutput = "";
    var spokenBreak = helper.getSpokenWords(handlerInput, "break");
    var resolvedBreak = helper.getResolvedWords(handlerInput, "break");
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (resolvedBreak === undefined) {
        speechcon = await data.getRandomSpeechcon(helper.getLocale(handlerInput));
        speakOutput = (await data.getRandomSpeech("BREAKAPOLOGY", helper.getLocale(handlerInput))).replace("SPOKENWORDS", spokenBreak);
    }
    else if (resolvedBreak.length > 0) {
        selectedBreak = resolvedBreak[0].value.name;
        var breakSSML = `<break strength='${selectedBreak}'/>`;
        speakOutput = ((await data.getRandomSpeech("BREAKDESCRIPTION", helper.getLocale(handlerInput))).replaceAll("BREAK", breakSSML)).replace("STRENGTH", selectedBreak);
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput} ${actionQuery}`)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = BreakIntent;

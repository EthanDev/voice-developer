const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function SpeechconIntent(handlerInput) {
//TODO: Add the ability to get a random speechcon from a specific type, like "celebration" or "disappointment."
    var speechconResult = helper.getResolvedWords(handlerInput, "speechcon");
    var resolvedCategory = helper.getResolvedWords(handlerInput, "category");
    var speechcon = "";
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));;

    if (speechconResult === undefined) {
        speechcon = await data.getRandomSpeechcon(helper.getLocale(handlerInput));
        speakOutput = `<say-as interpret-as='interjection'>${speechcon}</say-as><break time='.5s'/>`;
    }
    else if (speechconResult.length > 0) {
        speechcon = speechconResult[0].value.name;
        speakOutput = `<say-as interpret-as='interjection'>${speechcon}<break time='.5s'/></say-as> `;
    }

    var achievementSpeech = await data.updateUserSpeechconCount(handlerInput, 1);
    speakOutput += achievementSpeech;

    return handlerInput.responseBuilder
        .speak(`${speakOutput} ${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        .withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = SpeechconIntent;
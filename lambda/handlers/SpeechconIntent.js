const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function SpeechconIntent(handlerInput) {
//TODO: Add the ability to get a random speechcon from a specific type, like "celebration" or "disappointment."
    var resolvedSpeechcon = helper.getResolvedWords(handlerInput, "speechcon");
    var spokenCategory = helper.getSpokenWords(handlerInput, "category");
    var resolvedCategory = helper.getResolvedWords(handlerInput, "category");
    var speechcon = "";
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));;

    if (resolvedSpeechcon != undefined && resolvedSpeechcon.length > 0) {
        speechcon = resolvedSpeechcon[0].value.name;
    }
    else if (resolvedCategory.length > 0) {
        speakOutput = `Here's a random speechcon from the ${resolvedCategory[0].value.name} category. `;
        speechcon = await data.getRandomSpeechconByCategory(helper.getLocale(handlerInput), resolvedCategory[0].value.id);
    }
    else if (spokenCategory != undefined) {
        speakOutput = `I'm sorry, I don't have any speechcons in the ${spokenCategory} category.  You can try category names like Disappointment, Celebration, Animal Sounds, or even Pirate, though. `;
        speechcon = await data.getRandomSpeechcon(helper.getLocale(handlerInput));
    }
    else if (resolvedSpeechcon === undefined) {
        speechcon = await data.getRandomSpeechcon(helper.getLocale(handlerInput));
    }
    
    speakOutput += `<say-as interpret-as='interjection'>${speechcon}</say-as>. `;

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
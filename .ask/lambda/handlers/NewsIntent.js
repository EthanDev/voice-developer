const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function NewsIntent(handlerInput) {

    var speakOutput = "";
    var newsItems = await data.getNews(helper.getLocale(handlerInput));
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (newsItems === undefined) {
        //TODO: Let the user know that we don't currently have any news.  This should never happen, but weirder things have.
    }
    else {
        var newsIntro = await data.getRandomSpeech("NEWSINTRO", helper.getLocale(handlerInput));
        speakOutput = newsIntro;
        for (var i = 0;i<newsItems.length;i++) {
            speakOutput += `<audio src='soundbank://soundlibrary/musical/amzn_sfx_electronic_beep_01'/>${newsItems[i].fields.VoiceHeadline}<break time='.4s'/>${newsItems[i].fields.VoiceBody}`;
        }
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = NewsIntent;
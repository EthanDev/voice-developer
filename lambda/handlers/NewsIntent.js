const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function NewsIntent(handlerInput) {

    var speakOutput = "";
    var newsItems = await data.getNews(helper.getLocale(handlerInput));
    var newsItemsForAPL = [];
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (newsItems === undefined) {
        //TODO: Let the user know that we don't currently have any news.  This should never happen, but weirder things have.
    }
    else {
        var newsIntro = await data.getRandomSpeech("NEWSINTRO", helper.getLocale(handlerInput));
        speakOutput = newsIntro;
        for (var i = 0;i<newsItems.length;i++) {
            if (newsItems[i].fields.VoiceHeadline === undefined) newsItems[i].fields.VoiceHeadline = "";
            if (newsItems[i].fields.VoiceBody === undefined) newsItems[i].fields.VoiceBody = "";
            newsItemsForAPL[i] = {
                itemType: "notification",
                primaryText: newsItems[i].fields.VoiceBody,
                secondaryText: newsItems[i].fields.VoiceHeadline,
                tertiaryText: newsItems[i].fields.Link,
                //TODO: Create a default news item image.  Pull an image from the database if it exists.    
                imageSource: "https://d2o906d8ln7ui1.cloudfront.net/images/md_brie.png"
              };
            speakOutput += `<audio src='soundbank://soundlibrary/musical/amzn_sfx_electronic_beep_01'/>${newsItems[i].fields.VoiceHeadline}<break time='.4s'/>${newsItems[i].fields.VoiceBody}`;
        }
    }

    //TODO: Alex says change everything to a SpeakItem. Go figure out how to do that. :)
    //TODO: Play with the formatting of the AlexaTextListItem so that it looks better.  Remember that PrimaryText needs to be the longer content.
    //TODO: Handle the back button event.
    if (helper.supportsAPL(handlerInput)) {
        const newsList = require("../apl/newsList.json");
        var newsListDataSource = require("../apl/newsListDatasource.json");
        newsListDataSource.itemList.items = newsItemsForAPL;
        var APL = {
            "type": "Alexa.Presentation.APL.RenderDocument",
            "token": "helloworldToken",
            "document": newsList,
            "datasources": newsListDataSource
          }
        handlerInput.responseBuilder.addDirective(APL)
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = NewsIntent;
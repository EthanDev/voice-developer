const data = require("../data");
const helper = require("../helper");

//TODO: Play a video when the user selects one by tap or voice.
//TODO: Make sure the video interface includes play/pause, FF, RW, and a back button.

async function OfficeHoursIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speakOutput = "This is the Office Hours intent."
    var actionQuery = "This is the action query.";

    var apl = require("../apl/videoEpisodeList.json");
    var datasource = require("../apl/videoEpisodeListDataSource.json");

    var officeHoursData = await data.getMostRecentOfficeHoursVideos(10);
    var officeHoursList = [];

    for (var i = 0;i<officeHoursData.length;i++) {
        var videoObject = {
            "premiereDate": `${officeHoursData[i].fields.Guests}`,
            "name": `${officeHoursData[i].fields.Title}`,
            "backdropImageSource": "/Items/67165/Images/backdrop?maxWidth=1200&amp;maxHeight=800&amp;quality=90",
            "index": `${(new Date(officeHoursData[i].fields.Published)).toDateString()}`,
            "primaryImageSource": `${officeHoursData[i].fields.Thumbnail[0].url}`,
            "id": 67177,
            "type": "Episode"
          };
        officeHoursList.push(videoObject);
    }

    datasource.templateData.properties.items = officeHoursList;

    var directive = {
        type: 'Alexa.Presentation.APL.RenderDocument',
        token: '[SkillProvidedToken]',
        version: '1.0',
        document: apl,
        datasources: datasource
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput} ${actionQuery}`)
        .addDirective(directive)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = OfficeHoursIntent;

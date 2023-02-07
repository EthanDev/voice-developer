const data = require("../data");
const helper = require("../helper");

async function UserEventRequest(handlerInput) {
    //TODO: Add a back button to the video player.
    //TODO: Add the ability to watch the video at a faster rate, like 1.5x or 2.0x
    //TODO: Add the ability to manually control the time scrubber, so they can pick the part of the episode they want.
    //TODO: Add an intent that catches date values, and show the appropriate office hours episode for that date.
    var videoId = handlerInput.requestEnvelope.request.source.id;

    var video = await data.getVideo(videoId);

    var speakOutput = "This is the Office Hours intent."
    var actionQuery = "This is the action query.";

    var apl = require("../apl/videoPlayer.json");
    var datasource = require("../apl/videoPlayerDataSource.json");

    //datasource.videoplayerData.properties.displayText = "";
    // datasource.videoplayerData.properties.playlist[0].subtitle = (new Date(video.Published)).toDateString();
    // datasource.videoplayerData.properties.playlist[0].title = video.Title;
    // datasource.videoplayerData.properties.playlist[0].url = video.S3Link;

    var directive = {
        type: 'Alexa.Presentation.APL.RenderDocument',
        token: '[SkillProvidedToken]',
        version: '1.0',
        document: apl,
        datasources: datasource
    }

    return handlerInput.responseBuilder
        //.speak(`${speakOutput} ${actionQuery}`)
        .addDirective(directive)
        //.reprompt(actionQuery)
        .getResponse();
}

module.exports = UserEventRequest;

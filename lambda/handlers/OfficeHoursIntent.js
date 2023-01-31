const data = require("../data");
const helper = require("../helper");

//TODO: Remove the static URL to the video from the APL doc.
//TODO: Add the ability to request previous episodes by date.

async function OfficeHoursIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speakOutput = "This is the Office Hours intent."
    var actionQuery = "This is the action query.";

    var apl = require("../apl/videoPlayer.json");

    var directive = {
        type: 'Alexa.Presentation.APL.RenderDocument',
        token: '[SkillProvidedToken]',
        version: '1.0',
        document: apl.document,
        datasources: apl.datasources
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput} ${actionQuery}`)
        .addDirective(directive)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = OfficeHoursIntent;

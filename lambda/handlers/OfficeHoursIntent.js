const data = require("../data");
const helper = require("../helper");

async function OfficeHoursIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speakOutput = "This is the Office Hours intent."
    var actionQuery = "This is the action query.";

    var apl = require("../apl/videoplayer.json");

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

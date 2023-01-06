const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function EmphasisIntent(handlerInput) {
    var spokenEmphasis = helper.getSpokenWords(handlerInput, "emphasis");
    var resolvedEmphasis = helper.getResolvedWords(handlerInput, "emphasis");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    var normal = await data.getRandomSpeech("NORMAL", helper.getLocale(handlerInput));

    if (resolvedEmphasis === undefined) {
        if (spokenEmphasis != undefined) {
            var emphasisApology = await data.getRandomSpeech("EMPHASISAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = `${emphasisApology.replace("SPOKENWORDS", spokenEmphasis)} ${actionQuery}`;
        }
    }
    else {
        var emphasis = resolvedEmphasis[0].value.name;
        var emphasisValue = emphasis;
        if (emphasisValue === normal) emphasisValue = undefined;
        var [emphasisConfirmation, userEmphasis] = await Promise.all([
            data.getRandomSpeech("EMPHASISCONFIRMATION", helper.getLocale(handlerInput)),
            data.updateUserEmphasis(handlerInput, emphasisValue)
        ]);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.user.Emphasis = emphasisValue;
        if (emphasis != normal) {
            speakOutput = `<emphasis level="${emphasis}">${emphasisConfirmation.replace("EMPHASIS", emphasis)} ${actionQuery}</emphasis>`;
        }
        else speakOutput = `${emphasisConfirmation.replace("EMPHASIS", emphasis)} ${actionQuery}`;
        
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = EmphasisIntent;
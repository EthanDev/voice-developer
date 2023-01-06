const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function ProsodyRateIntent(handlerInput) {
    var spokenRate = helper.getSpokenWords(handlerInput, "prosodyRate");
    var resolvedRate = helper.getResolvedWords(handlerInput, "prosodyRate");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    var normal = await data.getRandomSpeech("NORMAL", helper.getLocale(handlerInput));

    if ((resolvedRate === undefined)) {
        //TODO: What did you expect to happen when the user doesn't say anything other than to trigger the intent?
        if (spokenRate != undefined) {
            var rateApology = await data.getRandomSpeech("PROSODYRATEAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = `${rateApology.replace("SPOKENWORDS", spokenRate)} ${actionQuery}`;
        }
    }
    else {
        var rate = resolvedRate[0].value.name;
        var rateValue = rate;
        if (rateValue === normal) rateValue = undefined;
        var [rateConfirmation, userRate] = await Promise.all([
            data.getRandomSpeech("PROSODYRATECONFIRMATION", helper.getLocale(handlerInput)),
            data.updateUserProsodyRate(handlerInput, rateValue)
        ]);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.user.ProsodyRate = rateValue;
        if (rate != normal) {
            speakOutput = `<prosody rate="${rate}">${rateConfirmation.replace("RATE", rate)} ${actionQuery}</prosody>`;
        }
        else speakOutput = `${rateConfirmation.replace("RATE", rate)} ${actionQuery}`;
        
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = ProsodyRateIntent;
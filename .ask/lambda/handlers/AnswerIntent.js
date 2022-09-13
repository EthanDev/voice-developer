const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function AnswerIntent(handlerInput) {
//TODO: If there is only one entity resolved, provide the answer.
//TODO: If there is more than one entity resolved, provide a list of options.
//TODO: If there are no entities resolved, parrot back to the user, and tell them you "don't know about that one."
    var spokenAnswer = helper.getSpokenWords(handlerInput, "answer");
    var resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (resolvedAnswer === undefined) {
        //TODO: Should we also retrieve a random answer for them?
        var answerApology = await data.getRandomSpeech("ANSWERAPOLOGY", helper.getLocale(handlerInput));
        speakOutput = answerApology.replace("SPOKENWORDS", spokenAnswer);
    }
    else if (resolvedAnswer.length === 1) {
        //TODO: Mark this answer as one that the user has heard before.
        answerId = resolvedAnswer[0].value.id;
        var answer = await data.getAnswer(answerId, helper.getLocale(handlerInput));
        var answerConfirmation = await data.getRandomSpeech("ANSWERCONFIRMATION", helper.getLocale(handlerInput));
        var answerName = answer.Name;
        if (answer.Pronunciation != undefined) answerName = answer.Pronunciation;
        speakOutput = `${answerConfirmation.replace("ANSWER", answerName)}. ${answer.VoiceResponse}`;
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = AnswerIntent;
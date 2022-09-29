const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function AnswerIntent(handlerInput) {
//TODO: If there is more than one entity resolved, provide a list of options. (What do you do if there are 5 or more resolutions?)
    var spokenAnswer = helper.getSpokenWords(handlerInput, "answer");
    var resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (resolvedAnswer === undefined) {
        //TODO: Should we also retrieve a random answer for them?
        var missedAnswer = await data.saveMissedAnswer(spokenAnswer, handlerInput);
        var answerApology = await data.getRandomSpeech("ANSWERAPOLOGY", helper.getLocale(handlerInput));
        speakOutput = answerApology.replace("SPOKENWORDS", spokenAnswer);
    }
    else if (resolvedAnswer.length === 1) {
        //TODO: Mark this answer as one that the user has heard before.
        answerId = resolvedAnswer[0].value.id;

        var [answer, answerConfirmation, userAnswerRecord] = await Promise.all([
            data.getAnswer(answerId, helper.getLocale(handlerInput)),
            data.getRandomSpeech("ANSWERCONFIRMATION", helper.getLocale(handlerInput)),
            data.saveUserAnswer(answerId, handlerInput)
        ]);
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
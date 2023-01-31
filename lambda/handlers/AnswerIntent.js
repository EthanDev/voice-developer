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
        //TODO: We should award achievements for hearing many answers.
        if (spokenAnswer != undefined) {
            var missedAnswer = await data.saveMissedAnswer(spokenAnswer, handlerInput);
            var answerApology = await data.getRandomSpeech("ANSWERAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = answerApology.replace("SPOKENWORDS", spokenAnswer);
        }
        else {
            var [answer, answerConfirmation] = await Promise.all([
                data.getRandomAnswer(handlerInput),
                data.getRandomSpeech("ANSWERRANDOM", helper.getLocale(handlerInput)),
            ]);
            //TODO: What do we do when they have heard ALL of the answers?
            var answerName = answer.Name;
            if (answer.Pronunciation != undefined) answerName = answer.Pronunciation;
            speakOutput = `${answerConfirmation.replace("NAME", answerName)}. ${answer.VoiceResponse}`;
            var userAnswerRecord = await data.saveUserAnswer(answer.RecordId, handlerInput)
        }
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

        if (helper.supportsAPL(handlerInput)) {
            var apl = require("../apl/answerLink.json");

            apl.document.mainTemplate.items[0].items[0].items[1].buttonText = answer.LinkPrefix;
            apl.document.mainTemplate.items[0].items[0].items[1].primaryAction[0].source = answer.Link;
            apl.document.mainTemplate.items[0].items[0].items[0].source = answer.Media[0].url;
            apl.document.mainTemplate.items[0].items[0].items[2].text = `<br/>${answer.ScreenResponse}`;
            

            var directive = {
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: '[SkillProvidedToken]',
                version: '1.0',
                document: apl.document,
                datasources: apl.datasources
            }
            handlerInput.responseBuilder.addDirective(directive);
        }

        handlerInput.responseBuilder.withSimpleCard(`${answer.Name}`, `${answer.CardResponse}\r\n ${answer.LinkPrefix} ${answer.Link}`);
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput} ${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        //.withSimpleCard(`Speechcon: ${speechcon}`, `SSML SYNTAX:\n<say-as interpret-as='interjection'>${speechcon}</say-as>`)
        .getResponse();
}

module.exports = AnswerIntent;
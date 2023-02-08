const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function AnswerIntent(handlerInput) {

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();  
    var spokenAnswer = helper.getSpokenWords(handlerInput, "answer");
    var resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));    

    if (resolvedAnswer === undefined) {
        if (spokenAnswer != undefined) {
            var missedAnswer = await data.saveMissedAnswer(spokenAnswer, handlerInput);
            var answerApology = await data.getRandomSpeech("ANSWERAPOLOGY", helper.getLocale(handlerInput));
            speakOutput = `${answerApology.replace("SPOKENWORDS", spokenAnswer)} ${actionQuery}`;
        }
        else {
            var [answer, answerConfirmation] = await Promise.all([
                data.getRandomAnswer(handlerInput),
                data.getRandomSpeech("ANSWERRANDOM", helper.getLocale(handlerInput)),
            ]);
            sessionAttributes.user.AnswerCount++;

            speakOutput = `${await createAnswerResponse(handlerInput, answer, answerConfirmation)} ${actionQuery}`;
        }
    }
    else if (resolvedAnswer.length === 1) {
        answerId = resolvedAnswer[0].value.id;
        var [answer, answerConfirmation] = await Promise.all([
            data.getAnswer(answerId, helper.getLocale(handlerInput)),
            data.getRandomSpeech("ANSWERCONFIRMATION", helper.getLocale(handlerInput)),
        ]);

        if ((!answer.UserAnswer)||(answer.UserAnswer && !answer.UserAnswer.includes(sessionAttributes.user.RecordId))) {
            sessionAttributes.user.AnswerCount++;
        }

        speakOutput = `${await createAnswerResponse(handlerInput, answer, answerConfirmation)} ${actionQuery}`;
    }
    else if (resolvedAnswer.length > 1) {
        var optionList = "";
        for (var i = 0;i<resolvedAnswer.length;i++) {
            if (i > 0) optionList += ", "
            if (i === resolvedAnswer.length-1) optionList += " or ";
            optionList += `${resolvedAnswer[i].value.name}`;
        }
        speakOutput = `I heard you say ${spokenAnswer}, and I found ${resolvedAnswer.length} options for you. Did you want ${optionList}? `;
    }
    var achievementSpeech = await data.checkAnswerAchievements(handlerInput);
    speakOutput = achievementSpeech + speakOutput;

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        .reprompt(actionQuery)
        .getResponse();
}

async function createAnswerResponse(handlerInput, answer, speech) {
    var answerName = answer.Name;
    var userAnswerResponse = await data.saveUserAnswer(answer.RecordId, handlerInput);

    if (answer.Pronunciation != undefined) answerName = answer.Pronunciation;
    var speakOutput = `${speech.replace("ANSWER", answerName)}. ${answer.VoiceResponse}`;

    if (helper.supportsAPL(handlerInput)) {
        var apl = require("../apl/answerLink.json");

        if (answer.LinkPrefix) apl.document.mainTemplate.items[0].items[0].items[1].buttonText = answer.LinkPrefix;
        if (answer.Link) apl.document.mainTemplate.items[0].items[0].items[1].primaryAction[0].source = answer.Link;
        if (answer.Media) apl.document.mainTemplate.items[0].items[0].items[0].source = answer.Media[0].url;
        if (answer.ScreenResponse) apl.document.mainTemplate.items[0].items[0].items[2].text = `<br/>${answer.ScreenResponse}`;
        

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

    return speakOutput;
}

module.exports = AnswerIntent;
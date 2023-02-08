const awardSpecificAchievement = require("./awardSpecificAchievement");

async function checkAnswerAchievements(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var count = sessionAttributes.user.AnswerCount;

    if (count >= 250) return await awardSpecificAchievement("ANSWER_250", handlerInput);
    if (count >= 100) return await awardSpecificAchievement("ANSWER_100", handlerInput);
    if (count >= 50) return await awardSpecificAchievement("ANSWER_50", handlerInput);
    if (count >= 25) return await awardSpecificAchievement("ANSWER_25", handlerInput);
    if (count >= 10) return await awardSpecificAchievement("ANSWER_10", handlerInput);
    if (count >= 5) return await awardSpecificAchievement("ANSWER_5", handlerInput);
    if (count >= 1) return await awardSpecificAchievement("ANSWER_1", handlerInput);
    return "";
}

module.exports = checkAnswerAchievements;
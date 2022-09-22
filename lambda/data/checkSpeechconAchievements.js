const awardSpecificAchievement = require("./awardSpecificAchievement");

async function checkSpeechconAchievements(handlerInput, count) {
    if (count >= 250) return await awardSpecificAchievement("SPEECHCON_250", handlerInput);
    if (count >= 100) return await awardSpecificAchievement("SPEECHCON_100", handlerInput);
    if (count >= 50) return await awardSpecificAchievement("SPEECHCON_50", handlerInput);
    if (count >= 25) return await awardSpecificAchievement("SPEECHCON_25", handlerInput);
    if (count >= 10) return await awardSpecificAchievement("SPEECHCON_10", handlerInput);
    if (count >= 1) return await awardSpecificAchievement("SPEECHCON_1", handlerInput);
    return "";
}

module.exports = checkSpeechconAchievements;
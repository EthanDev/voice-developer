const awardSpecificAchievement = require("./awardSpecificAchievement");

async function checkSoundEffectAchievements(handlerInput, count) {
    if (count >= 250) return await awardSpecificAchievement("EFFECT_250", handlerInput);
    if (count >= 100) return await awardSpecificAchievement("EFFECT_100", handlerInput);
    if (count >= 50) return await awardSpecificAchievement("EFFECT_50", handlerInput);
    if (count >= 25) return await awardSpecificAchievement("EFFECT_25", handlerInput);
    if (count >= 10) return await awardSpecificAchievement("EFFECT_10", handlerInput);
    if (count >= 1) return await awardSpecificAchievement("EFFECT_1", handlerInput);
    return "";
}

module.exports = checkSoundEffectAchievements;
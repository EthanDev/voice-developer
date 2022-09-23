const awardSpecificAchievement = require("./awardSpecificAchievement");

async function checkIntentAchievements(handlerInput, code) {
    return await awardSpecificAchievement(code, handlerInput);
}

module.exports = checkIntentAchievements;
const awardSpecificAchievement = require("./awardSpecificAchievement");
const checkIntentAchievements = require("./checkIntentAchievements");
const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");
const checkSpeechconAchievements = require("./checkSpeechconAchievements");
const getAnswer = require("./getAnswer");
const getNews = require("./getNews");
const getRandomSoundEffect = require("./getRandomSoundEffect");
const getRandomSpeech = require("./getRandomSpeech");
const getRandomSpeechcon = require("./getRandomSpeechcon");
const getSoundEffect = require("./getSoundEffect");
const getUserRecord = require("./getUserRecord");
const saveMissedAnswer = require("./saveMissedAnswer");
const saveUserAnswer = require("./saveUserAnswer");
const updateUserSoundEffectCount = require("./updateUserSoundEffectCount");
const updateUserSpeechconCount = require("./updateUserSpeechconCount");

module.exports = {
    awardSpecificAchievement,
    checkIntentAchievements,
    checkSoundEffectAchievements,
    checkSpeechconAchievements,
    getAnswer,
    getNews,
    getRandomSoundEffect,
    getRandomSpeech,
    getRandomSpeechcon,
    getSoundEffect,
    getUserRecord,
    saveMissedAnswer,
    saveUserAnswer,
    updateUserSoundEffectCount,
    updateUserSpeechconCount
};
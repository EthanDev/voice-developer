const awardSpecificAchievement = require("./awardSpecificAchievement");
const checkAnswerAchievements = require("./checkAnswerAchievements");
const checkIntentAchievements = require("./checkIntentAchievements");
const checkSoundEffectAchievements = require("./checkSoundEffectAchievements");
const checkSpeechconAchievements = require("./checkSpeechconAchievements");
const getAnswer = require("./getAnswer");
const getNews = require("./getNews");
const getMostRecentOfficeHoursVideos = require("./getMostRecentOfficeHoursVideos");
const getRandomAnswer = require("./getRandomAnswer");
const getRandomSoundEffect = require("./getRandomSoundEffect");
const getRandomSpeech = require("./getRandomSpeech");
const getRandomSpeechcon = require("./getRandomSpeechcon");
const getSoundEffect = require("./getSoundEffect");
const getUserRecord = require("./getUserRecord");
const saveMissedAnswer = require("./saveMissedAnswer");
const saveUserAnswer = require("./saveUserAnswer");
const updateUserDomain = require("./updateUserDomain");
const updateUserEmotion = require("./updateUserEmotion");
const updateUserEmphasis = require("./updateUserEmphasis");
const updateUserProsodyRate = require("./updateUserProsodyRate");
const updateUserSoundEffectCount = require("./updateUserSoundEffectCount");
const updateUserSpeechconCount = require("./updateUserSpeechconCount");
const updateUserVoice = require("./updateUserVoice");

module.exports = {
    awardSpecificAchievement,
    checkAnswerAchievements,
    checkIntentAchievements,
    checkSoundEffectAchievements,
    checkSpeechconAchievements,
    getAnswer,
    getNews,
    getMostRecentOfficeHoursVideos,
    getRandomAnswer,
    getRandomSoundEffect,
    getRandomSpeech,
    getRandomSpeechcon,
    getSoundEffect,
    getUserRecord,
    saveMissedAnswer,
    saveUserAnswer,
    updateUserDomain,
    updateUserEmotion,
    updateUserEmphasis,
    updateUserProsodyRate,
    updateUserSoundEffectCount,
    updateUserSpeechconCount,
    updateUserVoice
};
const Airtable = require("airtable");
const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");
const getRandomSpeech = require("./getRandomSpeech");

async function awardSpecificAchievement(code, handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const locale = helper.getLocale(handlerInput);
    const userRecordId = sessionAttributes.user.RecordId;
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Achievement?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE(),Code="${code}",FIND(%22${locale}%22%2C+Locale)!%3D0)`;
    //console.log(`FULL PATH ${url}`);
    const options = {method: "GET",};

    var achievementSpeech = "";
    if (code.indexOf("EFFECT") != -1) achievementSpeech = await getRandomSpeech("ACHIEVEMENTUNLOCKEDNOSOUND", locale);
    else achievementSpeech = await getRandomSpeech("ACHIEVEMENTUNLOCKED", locale);

    return fetch(url, options)
        .then((res) => res.json())
        .then((r) => {
            if (r.records.length > 0) {
                const achievement = r.records[0];
                if (!achievement.fields.UserAchievement || (achievement.fields.UserAchievement && !achievement.fields.User.includes(userRecordId))) {
                    if (achievement.id) createUserAchievementRecord(userRecordId, achievement.id);
                    return `${achievementSpeech} ${achievement.fields.Description}`;
                }
            }
            return "";
        });
}

function createUserAchievementRecord(userId, achievementId) {
    var airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("UserAchievement").create(
            { User: [userId], Achievement: [achievementId] },
            function (err, record) {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(record);
            });
    });
}

module.exports = awardSpecificAchievement;
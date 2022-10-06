const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("./keys");

async function getRandomAnswer(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const locale = helper.getLocale(handlerInput);
    var findClauses = "";  //FIND(%22${locale}%22%2C+UserAnswer)!%3D0,

    if (sessionAttributes.user.UserAnswer != undefined) {
        for (var i=0;i<sessionAttributes.user.UserAnswer.length;i++) {
            findClauses += `FIND(%22${sessionAttributes.user.UserAnswer[i]}%22%2C+UserAnswer)+%3D+0,`
        }
    }
  
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Answer?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE(),${findClauses}FIND(%22${locale}%22%2C+Locale)!%3D0)`;
    const options = {
        method: "GET",
    };
    //console.log(`FULL PATH ${url}`);

    return fetch(url, options)
        .then((res) => res.json())
        .then((r) => {
        const item = helper.getRandomItem(r.records);
        return item.fields;
        });
}

module.exports = getRandomAnswer;
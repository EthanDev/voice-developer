const data = require("../data");
const helper = require("../helper");
//const clocktest = require("../apl/clocktest.json");

async function LaunchRequest(handlerInput) {
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  // helper.setAction(handlerInput, `LAUNCHREQUEST`);
  // const locale = helper.getLocale(handlerInput);

  var speakOutput = "";
  if (sessionAttributes.isFirstTime) speakOutput = await data.getRandomSpeech("WELCOMEFIRST", helper.getLocale(handlerInput));
  else speakOutput = await data.getRandomSpeech("WELCOME", helper.getLocale(handlerInput));

  var [actionQuery, recommendation] = await Promise.all([
    data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput)),
    data.getRandomSpeech("RECOMMENDATION", helper.getLocale(handlerInput))
  ]);

  //THIS COMMENTED CODE IS TO USE DYNAMIC ENTITIES TO UPDATE THE Answer SLOT.
  //ALSO TRIED USING CATALOGS, BUT IT IS WAY TOO COMPLICATED SO FAR.  amzn1.ask.interactionModel.catalog.cfd3a8ff-db18-43dc-9bff-d2937b7fcf81
  //TODO: Need to figure out how to get an access token for a SMAPI call to last longer than 1 hour in Zapier.  https://zapier.com/editor/182304596
  await data.getMostRecentAnswers(handlerInput)

  // console.log(answers[0].fields.AlexaSlotValues.replace(/^,+|,+$/g, ''));
  // console.log(JSON.parse(answers[0].fields.AlexaSlotValues.replace(/^,+|,+$/g, '')))

  // //DYNAMIC ENTITIES UPDATE FOR THE ANSWER SLOT.  THIS ALLOWS DATA ENTRY WITHOUT CODE UPDATES TO MODIFY THE ANSWER DATA VALUES.
  // var answerArray = [];
  // for (var i = 0;i<answers.length;i++) {
  //   var object = answers[i].fields.AlexaSlotValues.replace(/^,+|,+$/g, '');
  //   answerArray.push(JSON.parse(object));
  // }

  // let dynamicEntitiesDirective = {
  //   type: "Dialog.UpdateDynamicEntities",
  //   updateBehavior: "REPLACE",
  //   types: [
  //     {
  //       name: "answer",
  //       values: answerArray
  //     }
  //   ]
  // };

  //console.log(clocktest);

  return handlerInput.responseBuilder
    .speak(`${speakOutput} ${recommendation} ${actionQuery}`)
    .reprompt(actionQuery)
    //.addDirective(dynamicEntitiesDirective)
    .getResponse();
}

module.exports = LaunchRequest;

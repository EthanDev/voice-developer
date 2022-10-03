const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function SessionResumedRequest(handlerInput) {
    
    // Session attributes and ID are same as previous IntentRequest
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.log("sessionAttributes : " + JSON.stringify(sessionAttributes));
    const token = handlerInput.requestEnvelope.request.cause.token;

    let request = handlerInput.requestEnvelope.request;
    let speakOutput = "Sorry, I had trouble doing what you asked. Please try again.";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (request.cause) {
            const token = request.cause.token;
            const status = request.cause.status;
            const code = status.code;
            const message = status.message;
            const payload = request.cause.result;

            console.info(`[Shopping Response] ${JSON.stringify(request)}`);
            console.info(`[INFO] Shopping Action Result: Code - ${code}, Message - ${message}, Payload - ${payload}`);

            switch(code) {
                case '200':
                    if (typeof payload !== "undefined") {
                        if (payload.code === "AlexaShopping.RetryLaterError") {
                            speakOutput =  "Looks like there was an issue. Let's get back to the skill.";
                        } else {
                            speakOutput = "I'm sorry, shopping indicated an issue while performing your request. Please try again later.";
                            console.info(`[INFO] Shopping Action had an issue while performing the request. ${payload.message}`);
                    }
                } else if (token === "PurchaseProductToken") {
                    console.info(`[INFO] Shopping Action: Buy action was a success for ${token}.`);
                    speakOutput = "Welcome back! ";
                }
        break;
        default :
            console.info(`[INFO] Shopping Action: There was a problem performing the shopping action.`);
            speakOutput = "There was a problem adding the item to your cart.";
        }
    }

    return handlerInput.responseBuilder
            .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
            .reprompt(actionQuery)
            .getResponse();
}

module.exports = SessionResumedRequest;
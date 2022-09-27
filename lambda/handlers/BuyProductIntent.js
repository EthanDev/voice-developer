const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function BuyProductIntent(handlerInput) {

    var spokenWords = helper.getSpokenWords(handlerInput, "product");
    var productList = helper.getResolvedWords(handlerInput, "product");
    var speakOutput = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    var actionTask = {};

    if (productList != undefined) {
        actionTask = {
            type: 'Connections.StartConnection',
            uri: 'connection://AMAZON.BuyShoppingProducts/1',
            input: {
                products : [
                   {
                     asin : productList[0].value.id
                   }
                ]
            },
            token: 'PurchaseProductToken'
        }
    
        var speakOutput = "OK.";
    }
    else
    {
        speakOutput = `I'm sorry. We don't actually sell ${spokenWords}. You can ask for an Echo or Echo Show device to make a purchase.`;
    }
    
    

    return handlerInput.responseBuilder
        .speak(`${speakOutput}`)
        //.reprompt(actionQuery)
        .addDirective(actionTask)
        .getResponse();
}

module.exports = BuyProductIntent;
const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function BuyProductIntent(handlerInput) {

    let actionTask = {
        type: 'Connections.StartConnection',
        uri: 'connection://AMAZON.BuyShoppingProducts/1',
        input: {
            products : [
               {
                 asin : 'B07XJ8C8F5'
               }
            ]
        },
        token: 'PurchaseProductToken'
    }

    var speakOutput = "Sending product to Amazon";

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .addDirective(actionTask)
        .getResponse();
}

module.exports = BuyProductIntent;
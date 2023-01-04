const Alexa = require('ask-sdk-core');
const handlers = require(`./handlers`);
const data = require(`./data`);
const helper = require("./helper");
//TODO: Create an Alexa Widget that shows the latest developer news.

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlers.LaunchRequest(handlerInput);
    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
    },
    handle(handlerInput) {
        return handlers.AnswerIntent(handlerInput);
    }
};

const BreakIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BreakIntent';
    },
    handle(handlerInput) {
        return handlers.BreakIntent(handlerInput);
    }
};

const BuyProductIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuyProductIntent';
    },
    handle(handlerInput) {
        return handlers.BuyProductIntent(handlerInput);
    }
};

const CancelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        return handlers.StopIntent(handlerInput);
    }
};
//TODO: Build a parrot intent that uses the SearchQuery to allow a user to hear what they said with the SSML modification they've selected.
//TODO: Add whisper mode (amazon:effect)

const DomainIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DomainIntent';
    },
    handle(handlerInput) {
        return handlers.DomainIntent(handlerInput);
    }
};

const EmotionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EmotionIntent';
    },
    handle(handlerInput) {
        return handlers.EmotionIntent(handlerInput);
    }
};

const EmphasisIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EmphasisIntent';
    },
    handle(handlerInput) {
        return handlers.EmphasisIntent(handlerInput);
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlers.HelpIntent(handlerInput);
    }
};

const NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewsIntent';
    },
    handle(handlerInput) {
        return handlers.NewsIntent(handlerInput);
    }
};

const PollyVoiceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PollyVoiceIntent';
    },
    handle(handlerInput) {
        return handlers.PollyVoiceIntent(handlerInput);
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        return handlers.RepeatIntent(handlerInput);
    }
};

const SessionResumedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionResumedRequest'
    },
    handle(handlerInput) {
        return handlers.SessionResumedRequest(handlerInput);
    }
};

const SSMLIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SSMLIntent';
    },
    handle(handlerInput) {
        return handlers.SSMLIntent(handlerInput);
    }
};

const SoundEffectIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SoundEffectIntent';
    },
    handle(handlerInput) {
        return handlers.SoundEffectIntent(handlerInput);
    }
};

const SpeechconIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SpeechconIntent';
    },
    handle(handlerInput) {
        return handlers.SpeechconIntent(handlerInput);
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        return handlers.StopIntent(handlerInput);
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Jeff, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RequestLog = {
    async process(handlerInput) {
      //console.log(`REQUEST ENVELOPE ${JSON.stringify(handlerInput.requestEnvelope)}`);
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      const userRecord = await data.getUserRecord(handlerInput);
      sessionAttributes.user = userRecord.fields;
      //sessionAttributes.isError = false;
    },
  };

const ResponseLog = {
    process(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput.responseBuilder.getResponse())}`);
        helper.applySSML(handlerInput);
        helper.putRepeatData(handlerInput);
    },
  };

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NewsIntentHandler,
        AnswerIntentHandler,
        SpeechconIntentHandler,
        SoundEffectIntentHandler,
        BuyProductIntentHandler,
        HelpIntentHandler,
        DomainIntentHandler,
        PollyVoiceIntentHandler,
        BreakIntentHandler,
        EmotionIntentHandler,
        EmphasisIntentHandler,
        SSMLIntentHandler,
        StopIntentHandler,
        RepeatIntentHandler,
        CancelIntentHandler,
        SessionResumedRequestHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        ) 
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(RequestLog)
    .addResponseInterceptors(ResponseLog)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();

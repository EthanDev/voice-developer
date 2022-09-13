const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function SoundEffectIntent(handlerInput) {

    var soundEffectSpokenWords = helper.getSpokenWords(handlerInput, "soundeffect");
    var soundEffectResolvedWords = helper.getResolvedWords(handlerInput, "soundeffect");

    var speakOutput = "";
    var soundEffectName = "";
    var SoundEffectCategory = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));;

    if (soundEffectResolvedWords === undefined) {
        //TODO: If we didn't match anything, get a random sound effect for them.
        //<audio src="soundbank://soundlibrary/air/fire_extinguisher/fire_extinguisher_01"/>
        soundEffect = await data.getRandomSoundEffect(helper.getLocale(handlerInput));
        speakOutput = `<audio src="soundbank://soundlibrary/${soundEffect.Category}/${soundEffect.Name}"/>`;
    }
    else if (soundEffectResolvedWords.length > 0) {
        soundEffect = soundEffectResolvedWords[0].value.name;
        speakOutput = `<audio src="soundbank://soundlibrary/${soundEffect.Category}/${soundEffect.Name}"/>`;
    }

    return handlerInput.responseBuilder
        .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        .withSimpleCard(`Sound Effect: ${soundEffect.Name}`, `SSML SYNTAX:\n<audio src="soundbank://soundlibrary/${soundEffect.Category}/${soundEffect.Name}"/>`)
        .getResponse();
}

module.exports = SoundEffectIntent;
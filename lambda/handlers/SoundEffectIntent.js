const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function SoundEffectIntent(handlerInput) {
    //TODO: Re-scrape the entire sound effects database to include name, folder structure, and category name.
    var soundEffectSpokenWords = helper.getSpokenWords(handlerInput, "soundeffect");
    var soundEffectResolvedWords = helper.getResolvedWords(handlerInput, "soundeffect");

    var speakOutput = "";
    var soundEffectName = "";
    var SoundEffectCategory = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));

    if (soundEffectResolvedWords === undefined) {
        var searchCode = helper.getRandomTwoCharacterCode();
        var [soundEffect, speakOutput] = await Promise.all([
            data.getRandomSoundEffect(searchCode, helper.getLocale(handlerInput)),
            data.getRandomSpeech("SOUNDEFFECT", helper.getLocale(handlerInput))
        ]);
        speakOutput = speakOutput.replace("TITLE", soundEffect.Title);
        soundEffectSSML = `<audio src='soundbank://soundlibrary/${soundEffect.Name}' />`
        speakOutput = speakOutput.replace("SOUNDEFFECT", soundEffectSSML);
    }
    else if (soundEffectResolvedWords.length > 0) {
        //TODO: If we have 1-4 resolutions, play all of them.  If there's 5 or more, what do we do?
        soundEffect = soundEffectResolvedWords[0].value.name;
        speakOutput = `<audio src='soundbank://soundlibrary/${soundEffect}'/>`;
    }
    //TODO: How can a user specify a specific sound effect?  How do they get "Giant Monster 10"?

    return handlerInput.responseBuilder
        .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        .withSimpleCard(`Sound Effect: ${soundEffect.Name}`, `SSML SYNTAX:\n<audio src="soundbank://soundlibrary/${soundEffect.Name}"/>`)
        .getResponse();
}

module.exports = SoundEffectIntent;
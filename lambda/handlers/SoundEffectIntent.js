const helper = require("../helper");
const data = require("../data");
const fetch = require("node-fetch");

async function SoundEffectIntent(handlerInput) {
    var soundEffectSpokenWords = helper.getSpokenWords(handlerInput, "soundeffect");
    console.log("SPOKEN WORDS = " + soundEffectSpokenWords);
    var soundEffectResolvedWords = helper.getResolvedWords(handlerInput, "soundeffect");

    var speakOutput = "";
    var SoundEffectCardExample = "";
    var SoundEffectCardTitle = "";
    var actionQuery = await data.getRandomSpeech("ACTIONQUERY", helper.getLocale(handlerInput));
    soundEffectCount = 0;

    //IF WE DIDN'T RESOLVE ANY WORDS, THEN GIVE THE USER A RANDOM SOUND EFFECT. (THIS IS ALSO TRUE IF THEY SAY "Give me a sound effect.")
    if (soundEffectResolvedWords === undefined) {
        var searchCode = helper.getRandomTwoCharacterCode();
        var [soundEffect, speakRandom, speakNotFound] = await Promise.all([
            data.getRandomSoundEffect(searchCode, helper.getLocale(handlerInput)),
            data.getRandomSpeech("SOUNDEFFECTRANDOM", helper.getLocale(handlerInput)),
            data.getRandomSpeech("SOUNDEFFECTNOTRESOLVED", helper.getLocale(handlerInput))
        ]);
        soundEffectSSML = `<audio src='soundbank://soundlibrary/${soundEffect.Name}' />`;
        SoundEffectCardExample = soundEffect.Name;
        SoundEffectCardTitle = soundEffect.Title;
        if (soundEffectSpokenWords === undefined) speakOutput = speakRandom;
        else speakOutput = speakNotFound;
        speakOutput = speakOutput.replace("QUERY", soundEffectSpokenWords)
        speakOutput = speakOutput.replace("SOUNDEFFECT", soundEffectSSML);
        speakOutput = speakOutput.replace("TITLE", soundEffect.Title);
        soundEffectCount += 1;
    }
    //IF WE DID RESOLVE SOMETHING
    else if (soundEffectResolvedWords.length > 0) {
        //FIRST, TRY TO FIND NATURAL MATCHES IN THE DATABASE. THIS ALLOWS US TO FIND LOTS OF MATCHES, WHERE ENTITY RESOLUTION WILL ONLY EVER BRING BACK FIVE.  PICK FIVE RANDOMLY FROM THE LIST, AND PLAY THOSE.
        var specificSoundEffect = await data.getSoundEffect(soundEffectSpokenWords, helper.getLocale(handlerInput));
        if (specificSoundEffect.length > 0) {
            var s = "";
            if (specificSoundEffect.length != 1) s = "s";
            speakOutput = (await data.getRandomSpeech("SOUNDEFFECTCOUNT", helper.getLocale(handlerInput))).replace("COUNT", specificSoundEffect.length).replace("S", s).replace("QUERY", soundEffectSpokenWords);
            var length = specificSoundEffect.length;
            if (specificSoundEffect.length > 5) {
                length = 5;
                speakOutput += await data.getRandomSpeech("SOUNDEFFECTLIMIT", helper.getLocale(handlerInput))
                var randomArray = [];
                for (var i = 0;i<5;i++) {
                    var random = helper.getRandom(0, specificSoundEffect.length-1);
                    randomArray[i] = specificSoundEffect[random];
                    specificSoundEffect.splice(random, 1);
                }
                specificSoundEffect = randomArray;
            } 
            for (var i = 0;i<length;i++) {
                speakOutput += (await data.getRandomSpeech("SOUNDEFFECT", helper.getLocale(handlerInput))).replace("TITLE", specificSoundEffect[i].fields.Title).replace("SOUNDEFFECT", "<audio src='soundbank://soundlibrary/" + specificSoundEffect[i].fields.Name + "' />");
                SoundEffectCardExample = specificSoundEffect[i].fields.Name;
                SoundEffectCardTitle = specificSoundEffect[i].fields.Title;
                soundEffectCount += 1;
            }
        }
        //IF WE DON'T FIND ANY DATABASE MATCHES, THEN JUST USE THE ONES THAT WERE RESOLVED. THIS IS MOST LIKELY TO HAPPEN WHEN WE HAVE ADDED CUSTOM SYNONYMS TO THE DATABASE.
        else
        {
            var s = "";
            if (soundEffectResolvedWords.length != 1) s = "s";
            speakOutput = (await data.getRandomSpeech("SOUNDEFFECTCOUNT", helper.getLocale(handlerInput))).replace("COUNT", soundEffectResolvedWords.length).replace("S", s).replace("QUERY", soundEffectSpokenWords);
            for (var i = 0;i<soundEffectResolvedWords.length;i++) {
                speakOutput += (await data.getRandomSpeech("SOUNDEFFECT", helper.getLocale(handlerInput))).replace("TITLE", soundEffectResolvedWords[i].value.name).replace("SOUNDEFFECT", "<audio src='soundbank://soundlibrary/" + soundEffectResolvedWords[i].value.id + "' />");
                SoundEffectCardExample = soundEffectResolvedWords[i].value.id;
                SoundEffectCardTitle = soundEffectResolvedWords[i].value.name;
                soundEffectCount += 1;
            }
        }
    }

    var achievementSpeech = await data.updateUserSoundEffectCount(handlerInput, soundEffectCount);
    speakOutput += achievementSpeech;
    //speakOutput += await achievement.checkSoundEffectAchievements(soundEffectCountResult);

    return handlerInput.responseBuilder
        .speak(`${speakOutput}<break time='.5s'/>${actionQuery}`)
        .reprompt(actionQuery)
        //TODO: APL!
        .withSimpleCard(`Sound Effect: ${SoundEffectCardTitle}`, `SSML SYNTAX:\n<audio src="soundbank://soundlibrary/${SoundEffectCardExample}"/>`)
        .getResponse();
}

module.exports = SoundEffectIntent;
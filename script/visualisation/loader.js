let loadingCounter = 0

/**
 * Function callback on loaded sound, it refreshes the UI of loading calling {@link updateLoading} or switches to intro screen by calling {@link toIntro}
 * @param {object} sound specific P5.js sound that was loaded
 */
function soundLoaded(sound) {
    loadingCounter++
    let targetCount = BIOME_COUNT * SOUND_COUNT

    console.log("Loaded "+ sound.file +" : " + loadingCounter + " of " + targetCount)

    // Updates loading with percentage loaded
    updateLoading(Math.round(100 * (loadingCounter / (targetCount))))

    if (loadingCounter == targetCount) {
        // Finished loading
        toIntro()
    }
}

/**
 * Function for loading individual scenes and its sounds, on finished loading sound callback is called {@link soundLoaded}
 */
function loadScenes() {
    for (let i = 0; i < BIOME_COUNT; i++) {
        let sceneSounds = []

        for (let j = 0; j < SOUND_COUNT; j++) {
            sceneSounds[j] = loadSound("../data/sounds/" + PATHS[i][j], soundLoaded)
        }
        sounds.push(sceneSounds)
    }
}
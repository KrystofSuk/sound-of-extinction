let loadingCounter = 0

// On sound loaded event
/**
 * 
 * @param {*} sound 
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

// Load each of the possible scenes beforehand
function loadScenes() {
    for (let i = 0; i < BIOME_COUNT; i++) {
        let sceneSounds = []

        for (let j = 0; j < SOUND_COUNT; j++) {
            sceneSounds[j] = loadSound("../data/sounds/" + PATHS[i][j], soundLoaded)
        }
        sounds.push(sceneSounds)
    }
}
// Canvas instance
let canvas
let copyBuffer
var visualisationGraphics

let timer

// Flags
let running = false
let fading = false

let pointsReached = 0

// Set active biome and label buttons
let activeBiome = 0


//----------------------------------------P5 Functions------------------------------------------------
function preload() {
    soundFormats("mp3", "wav")
    loadScenes()
}

function setup() {
    canvas = createCanvas(640, 640)
    canvas.parent("spectrogram-area")

    visualisationGraphics = createGraphics(RENDER_SIZE, RENDER_SIZE)

    fft = new p5.FFT()
}

function draw() {
    image(visualisationGraphics, 0, 0, width, height)
}


//------------------------------------Visualisation Functions------------------------------------------

// Sets the biome and active sounds
/**
 * Function for setting current biome parameters 
 * @param {int} biome identifier of the biome
 */
function setBiome(biome) {
    activeBiome = biome

    for (let i = 0; i < NAMES[activeBiome].length; i++) {
        let id = "sound" + i

        var soundButton = document.getElementById(id)
        soundButton.firstChild.nodeValue = NAMES[activeBiome][i]
    }

    visualisationGraphics.translate(RENDER_SIZE / 2, RENDER_SIZE / 2)
    visualisationGraphics.fill("#fff")
    visualisationGraphics.noStroke()

    visualisationGraphics.circle(0, 0, visualisationSize * 2)

    visualisationGraphics.noFill()

    visualisationGraphics.resetMatrix()
}

/**
 * Function for playing the sound either when users clicks button or visualisation want's to play ambient sound
 * @param {int} sound index of the sound
 * @param {string} button identifier of the button if any
 * @param {bool} loop flag for the looping of specific sound
 */
function playSound(sound, button = undefined, loop = false) {
    if (!running && !loop)
        return

    if (!sounds[activeBiome][sound].isPlaying() && !loop) {
        sounds[activeBiome][sound].setVolume(0, 0, 0)
        sounds[activeBiome][sound].play()
        sounds[activeBiome][sound].setVolume(1, .5, 0)
    } else if (!sounds[activeBiome][sound].isPlaying() && loop) {
        sounds[activeBiome][sound].setVolume(0, 0, 0)
        sounds[activeBiome][sound].play()
        sounds[activeBiome][sound].loop()
        sounds[activeBiome][sound].setVolume(1, 2.5, 0)
    } else {
        sounds[activeBiome][sound].stop()
    }

    // Mark button as selected or deselected
    if (button) {
        buttonClick(button, sound)
    }
}

// Reset whole scene for listening again
/**
 * Support function for clearing UI, resetting and cleaning everything before start of the visualisation
 */
function resetScene() {
    timer = 0
    pointsReached = 0

    updateTimeline()

    for (let i = 0; i < SOUND_COUNT - 1; i++) {
        let id = "sound" + i
        enableButton(id)
    }

    visualisationGraphics.clear()
    canvas.clear()
}

/**
 * Main visualisation tick
 */
function visualisationTick() {
    running = true
    timer += 1 / TOTAL_TIME / FPS

    // Fade out all sounds for active biome near the end 
    if (timer >= 0.875 && !fading) {
        fading = true
        for (let i = 0; i < SOUND_COUNT; i++) {
            sounds[activeBiome][i].setVolume(0, 2.5, 0)
        }
    }

    if (timer < 1) {

        let spectrum = fft.analyze()

        visualisationGraphics.translate(RENDER_SIZE / 2, RENDER_SIZE / 2)

        let angle = PI * 2 * timer - PI / 2
        let nextAngle = PI * 2 * (timer + 1 / TOTAL_TIME / FPS) - PI / 2
        let diff = nextAngle - angle
        let weight = visualisationSize / spectrum.length + 2

        visualisationGraphics.rotate(angle)

        for (let i = 0; i < spectrum.length; i++) {

            let x = map(i, 0, spectrum.length, visualisationSize, 0)
            let h = map(Math.pow(spectrum[i], .7), 0, 40, 255, 0)

            let lenght = diff

            visualisationGraphics.stroke(h, h, h, 255)
            visualisationGraphics.strokeCap(PROJECT)

            visualisationGraphics.strokeWeight(weight)
            visualisationGraphics.arc(0, 0, x * 2, x * 2, 0, lenght)
        }

        setTimeout(visualisationTick, 1000 / FPS)

        // Disabling of buttons when hitting the mark
        if (pointsReached < SOUND_COUNT - 1) {
            let point = "point" + pointsReached
            let coord = document.getElementById(point).getBoundingClientRect().left + 5

            if (window.innerWidth * timer > coord) {
                let id = "sound" + pointsReached
                disableButton(id)

                sounds[activeBiome][pointsReached + 1].setVolume(0, .5, 0)

                pointsReached++
            }
        }

        visualisationGraphics.rotate(-(PI * 2 * timer - PI / 2))
        visualisationGraphics.translate(-RENDER_SIZE / 2, -RENDER_SIZE / 2)
    } else {
        //Finished visualisation 

        timer = 1
        running = false
        fading = false

        copyBuffer = visualisationGraphics.get()

        for (let p = 0; p < posters.length; p++) {
            posters[p].visualise(copyBuffer, p)
        }

        toFinal()
        sounds[activeBiome][0].stop()
    }

    updateTimeline()
}
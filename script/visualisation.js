// Canvas instance
let cnv;

let timer;

let running = false;

let pointsReached = 0;

let visualisationSize = RENDER_SIZE / 2 - 5;

let img;
var pg;

// Set active biome and label buttons
let activeBiome = 0;

let loadingFlag = true;
let loadingCounter = 0;

function SoundLoaded(sound) {
    loadingCounter++

    let targetCount = BIOME_COUNT * SOUND_COUNT

    console.log("Loaded: " + loadingCounter + " of " + targetCount)

    //Updates loading with percentage loaded
    UpdateLoading(Math.round(100 * (loadingCounter / (targetCount))))

    if (loadingCounter == targetCount) {
        loadingFlag = true
        ToIntro()
    }
}

// Setup each of the possible scenes beforehand
function SetupScenes() {
    for (let i = 0; i < BIOME_COUNT; i++) {
        let sceneSounds = [];

        for (let j = 0; j < SOUND_COUNT; j++) {
            sceneSounds[j] = loadSound("data/sounds/" + PATHS[i][j], SoundLoaded);
        }
        sounds.push(sceneSounds);
    }
}

function preload() {
    soundFormats("mp3", "wav");
    SetupScenes();
}

function setup() {
    cnv = createCanvas(640, 640);
    cnv.parent("spectrogram-area");


    pg = createGraphics(RENDER_SIZE, RENDER_SIZE);

    fft = new p5.FFT();
}

function windowResized() {
    let minDimension = min(document.documentElement.clientHeight, document.documentElement.clientWidth - 100)

    if (running) {
        resizeCanvas(640, 640)
    }

}

function SetBiome(biome) {
    activeBiome = biome;

    for (let i = 0; i < NAMES[activeBiome].length; i++) {
        let id = "sound" + i;

        var soundButton = document.getElementById(id);
        soundButton.firstChild.nodeValue = NAMES[activeBiome][i];
    }

    pg.translate(RENDER_SIZE / 2, RENDER_SIZE / 2);
    pg.fill("#fff")
    pg.noStroke()

    pg.circle(0, 0, visualisationSize*2);

    pg.noFill()

    pg.resetMatrix();
}

// Update timeline progress
function UpdateTimeline() {
    let angle = timer / 1 * 360 + .1

    $("#timeline-fill").css("width", window.innerWidth * timer);
    $("#timeline-rotational-fill").css("background",
        "conic-gradient(var(--gray)" + angle + "deg, transparent " + angle + "deg 360deg)"
    );
}

// Enable button specified by id
function EnableButton(id) {
    var style = getComputedStyle(document.body);


    $("#" + id).css("background",
        "linear-gradient(to right, var(--dark-gray) 100%, var(--light-gray) 0%)"
    );

    $("#" + id).prop("disabled", false);
    $("#" + id).css("opacity", 1);
}

// Disable button specifed by id
function DisableButton(id) {
    $("#" + id).prop("disabled", true);
    $("#" + id).animate({opacity: "0"}, 500)
}

function ProgressButton(button, sound) {

    let percentage = sounds[activeBiome][sound].currentTime() / sounds[activeBiome][sound].duration() * 100

    $("#" + button).css("background",
        "linear-gradient(to right, var(--dark-gray)" + percentage + "%, var(--light-gray) " + percentage + "%)"
    );

    if (sounds[activeBiome][sound].isPlaying())
        setTimeout(() => {
            ProgressButton(button, sound)
        }, 1000 / 60)
}

// Mark button as active
function SetSelected(button, sound) {
    // Get globals from CSS
    var style = getComputedStyle(document.body);

    if (sounds[activeBiome][sound].isPlaying()) {
        //$("#" + button).css("backgroundColor", style.getPropertyValue('--light-gray'));

        $("#" + button).css("background",
            "linear-gradient(to right, var(--dark-gray) 50%, var(--light-gray) 50%)"
        );

        ProgressButton(button, sound)
    } else {
        //$("#" + button).css("backgroundColor", style.getPropertyValue('--dark-gray'));

        $("#" + button).css("background",
            "linear-gradient(to right, var(--dark-gray) 100%, var(--light-gray) 0%)"
        );

    }
}

// If the sound is not playing than play it, otherwise stop
function PlaySound(sound, button = undefined, loop = false) {

    if (!running && !loop)
        return;

    if (!sounds[activeBiome][sound].isPlaying() && !loop) {
        sounds[activeBiome][sound].setVolume(0, 0, 0)
        sounds[activeBiome][sound].play();
        sounds[activeBiome][sound].setVolume(1, .5, 0)
    } else if (!sounds[activeBiome][sound].isPlaying() && loop) {
        sounds[activeBiome][sound].setVolume(0, 0, 0)
        sounds[activeBiome][sound].play();
        sounds[activeBiome][sound].setVolume(0, 0, 0)
        sounds[activeBiome][sound].loop();
        sounds[activeBiome][sound].setVolume(1, 2.5, 0)
    } else {
        sounds[activeBiome][sound].stop();
    }
    // Mark button as selected or deselected
    if (button) {
        $("#" + button).prop("disabled", true);
        SetSelected(button, sound);

        setTimeout(() => {
            SetSelected(button, sound);
            $("#" + button).prop("disabled", false);
        }, sounds[activeBiome][sound].duration() * 1000 + 300)
    }
}



// Reset whole scene for listening again
function ResetScene() {
    timer = 0;
    pointsReached = 0;

    UpdateTimeline();

    //cnv.parent("spectrogram-area");

    for (let i = 0; i < SOUND_COUNT - 1; i++) {
        let id = "sound" + i;
        EnableButton(id);
    }
    pg.clear()
    cnv.clear()
}

let fading = false;

// Main visualization loop
function Timer() {
    running = true;
    timer += 1 / totalTime / fps;

    if(timer >= 0.875 && !fading){
        // Fade out all sounds for active biome
        fading = true;
        for (let i = 0; i < SOUND_COUNT; i++) {
            sounds[activeBiome][i].setVolume(0, 2.5, 0);
        }
    }

    if (timer >= 1) {

        timer = 1;
        running = false;
        fading = false;

        
        img = pg.get();

        for (let p = 0; p < posters.length; p++) {
            posters[p].visualise(img, p);
        }

        ToFinal();

        //cnv.parent("final-spectrogram-area");
        windowResized();
        sounds[activeBiome][0].stop();

    } else {

        let spectrum = fft.analyze();

        pg.translate(RENDER_SIZE / 2, RENDER_SIZE / 2);

        let angle = PI * 2 * timer - PI / 2;
        let nextAngle = PI * 2 * (timer + 1 / totalTime / fps) - PI / 2;
        let diff = nextAngle - angle
        let weight = visualisationSize / spectrum.length + 2

        pg.rotate(angle);

        for (let i = 0; i < spectrum.length; i++) {

            let x = map(i, 0, spectrum.length, visualisationSize, 0);
            let h = map(Math.pow(spectrum[i], .7), 0, 40, 255, 0);
            //pg.fill(h, h, h);
            //pg.rect(x, 0, RENDER_SIZE / spectrum.length, 4);

            let lenght = diff


            pg.stroke(h, h, h, 255)
            pg.strokeCap(PROJECT)

            pg.strokeWeight(weight);
            pg.arc(0, 0, x * 2, x * 2, 0, lenght);
        }

        setTimeout(Timer, 1000 / fps);

        // Disabling of buttons
        if (pointsReached < SOUND_COUNT - 1) {
            let point = "point" + pointsReached;
            let coord = document.getElementById(point).getBoundingClientRect().left + 5;

            if (window.innerWidth * timer > coord) {
                let id = "sound" + pointsReached;
                DisableButton(id);

                sounds[activeBiome][pointsReached + 1].setVolume(0, .5, 0);

                pointsReached++;
            }
        }
        pg.rotate(-(PI * 2 * timer - PI / 2));
        pg.translate(-RENDER_SIZE / 2, -RENDER_SIZE / 2);
    }
    UpdateTimeline();
}

function draw() {
    image(pg, 0, 0, width, height);
}
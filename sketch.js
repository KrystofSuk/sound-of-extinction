const BIOME_COUNT = 5;
const SOUND_COUNT = 5;

// Sounds per biome
let sounds = [];
const FOREST = ["forest/ambient_forest_v1.wav", "forest/eulemur_mongoz_v1.wav", "forest/gorilla_gorilla_v1.wav", "forest/mitu_mitu_v1.wav", "forest/pongo_pygmaeus_v1.wav"];
const SHRUBLAND = ["base.wav", "ambient", "ambient", "ambient", "ambient"];
const SAVANNA =  ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];
const DESERT = ["forest/ambient_forest_v1.wav", "desert/diceros_bicornis_v1.wav", "desert/gyps_africanus_v1.wav", "desert/oryx_dammah_v1.wav", "desert/saiga_tatarica_v1.wav"];
const GRASSLAND= ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];

const PATHS = [FOREST, SHRUBLAND, SAVANNA, DESERT, GRASSLAND];

// Animal names per biome
const FOREST_NAMES = ["Mongoose Lemur", "Western Gorilla", "Alagoas Curassow", "Bornean Orangutan"];
const SHRUBLAND_NAMES = ["Animal", "Animal", "Animal", "Animal"];
const SAVANNA_NAMES =  ["Animal", "Animal", "Animal", "Animal"];
const DESERT_NAMES = ["Black Rhinoceros", "White-backed Vulture", "Scimitar-horned Oryx", "Saiga Antelope"]
const GRASSLAND_NAMES = ["Animal", "Animal", "Animal", "Animal"];

const NAMES = [FOREST_NAMES, SHRUBLAND_NAMES, SAVANNA_NAMES, DESERT_NAMES, GRASSLAND_NAMES];


// Setup each of the possible scenes beforehand
function SetupScenes() {
  for (let i = 0; i < BIOME_COUNT; i++) {
    let sceneSounds = [];

    for(let j = 0; j < SOUND_COUNT; j++) {
      sceneSounds[j] = loadSound("data/sounds/" + PATHS[i][j]);
    }
    sounds.push(sceneSounds);
  }
}

// Canvas instance
let cnv;

function preload() {
  soundFormats("mp3", "wav");
  SetupScenes();
}

function setup() {
  cnv = createCanvas(document.documentElement.clientWidth / 3, document.documentElement.clientWidth/ 3);
  cnv.parent("spectrogram-area");

  fft = new p5.FFT();
}

function windowResized() {
  let minDimension = min(document.documentElement.clientHeight, document.documentElement.clientWidth - 100)

  if (running) {
    // Responsive canvas while drawing
    // img = cnv.get();
    // cnv = createCanvas(document.documentElement.clientWidth / 3, document.documentElement.clientWidth/ 3);
    // image(img, 0, 0, document.documentElement.clientWidth / 3, document.documentElement.clientWidth/ 3)
  }
  else {
    resizeCanvas(minDimension / 2, minDimension/ 2);
    image(img, 0, 0, minDimension / 2, minDimension / 2)
  }

}

// Set active biome and label buttons
let activeBiome;

function SetBiome(biome) {
  activeBiome = biome;

  for (let i = 0; i < NAMES[biome].length; i++) {
    let id = "sound" + i;

    var soundButton = document.getElementById(id);
    soundButton.firstChild.nodeValue = NAMES[biome][i];
  }
}

// Update timeline progress
function UpdateTimeline() {
  $("#timeline-fill").css("width", window.innerWidth * timer);
}

// Enable button specified by id
function EnableButton(id) {
  var style = getComputedStyle(document.body);

  $("#" + id).css("backgroundColor", style.getPropertyValue('--gray'));
  $("#" + id).prop("disabled", false);
}

// Disable button specifed by id
function DisableButton(id) {
  $("#" + id).prop("disabled", true);
}

// Mark button as active
function SetSelected(button, sound) {
  // Get globals from CSS
  var style = getComputedStyle(document.body);
  
  if (sounds[activeBiome][sound].isPlaying()) {
    $("#" + button).css("backgroundColor", style.getPropertyValue('--light-gray'));
  } 
  else {
    $("#" + button).css("backgroundColor", style.getPropertyValue('--gray'));
  }
}

// If the sound is not playing than play it, otherwise stop
function PlaySound(sound, button = undefined, instant = false) {
  if (!running && !instant) 
    return;

  if (!sounds[activeBiome][sound].isPlaying()) {
    sounds[activeBiome][sound].loop();
  } 
  else {
    sounds[activeBiome][sound].stop();
  }
  // Mark button as selected or deselected
  if (button) {
    SetSelected(button, sound);
  }
}

// Save created spectrogram
function DownloadImage() {
  saveCanvas("image", "png");
}

let timer;

// Reset whole scene for listening again
function ResetScene() {
  timer = 0;
  pointsReached = 0;

  cnv.parent("spectrogram-area");

  for (let i = 0; i < SOUND_COUNT - 1; i++) {
    let id = "sound" + i;
    EnableButton(id);
  }
  clear()
}

let totalTime = 30;
let fps = 30;
let running = false;

let pointsReached = 0;

let img;

// Main visualization loop
function Timer() {
  running = true;
  timer += 1 / totalTime / fps;

  if (timer > 1.005) {
    timer = 1;
    running = false;

    // Fade out all sounds for active biome
    for (let i = 0; i < SOUND_COUNT; i++) {
      sounds[activeBiome][i].setVolume(0, 2.5, 0);
    }

    // Wait for a few seconds until sound has faded out
    setTimeout(function() {
      // Save canvas in order to redraw
      img = cnv.get();
      
      ToFinal();

      cnv.parent("final-spectrogram-area");
      windowResized();
    }, 3000);
  }
  else {
    let spectrum = fft.analyze();

    translate(width / 2, height / 2);
    rotate(PI * 2 * timer - PI / 2);
  
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, width / 2 - 5, 0);
      let h = map(Math.pow(spectrum[i], .7), 0, 40, 255, 0);
      fill(h, h, h);
      rect(x, 0, width / spectrum.length, 2);
    }
    setTimeout(Timer, 1000 / fps);

    // Disabling of buttons
    if (pointsReached < SOUND_COUNT - 1) {
      let point = "point" + pointsReached;
      let coord = document.getElementById(point).getBoundingClientRect().left + 5;

      if (window.innerWidth * timer > coord) {
        let id = "sound" + pointsReached;
        DisableButton(id);

        pointsReached++;
      }
    }
  }
  UpdateTimeline();
}

function draw() {}

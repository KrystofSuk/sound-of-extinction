const BIOME_COUNT = 5;
const SOUND_COUNT = 5;

// Sounds per biome
let sounds = [];
const FOREST = ["forest/ambient_forest_v1.wav", "forest/eulemur_mongoz_v1.wav", "forest/gorilla_gorilla_v1.wav", "forest/mitu_mitu_v1.wav", "forest/pongo_pygmaeus_v1.wav"];
const SHRUBLAND = ["base.wav", "ambient", "ambient", "ambient", "ambient"];
const SAVANNA = ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];
const DESERT = ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];
const GRASSLAND= ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];

const PATHS = [FOREST, SHRUBLAND, SAVANNA, DESERT, GRASSLAND];

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

let cnv;

function preload() {
  soundFormats("mp3", "wav");

  SetupScenes();
}

function setup() {
  cnv = createCanvas(500, 500);
  cnv.parent("spectrogram-area");

  fft = new p5.FFT();
}

let activeBiome;
let timelinePoints;

function SetBiome(biome) {
  activeBiome = biome;
}

function SetPoints(points) {
  timelinePoints = points;
}

function EnableButton(id) {
  var style = getComputedStyle(document.body);

  $("#" + id).css("backgroundColor", style.getPropertyValue('--gray'));
  $("#" + id).prop("disabled", false);
}

function DisableButton(id) {
  $("#" + id).prop("disabled", true);
}

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

function PlaySound(sound, button = undefined, instant = false) {
  if (!running && !instant) 
    return;

  // If the sound is not playing than play it, otherwise stop
  if (!sounds[activeBiome][sound].isPlaying()) {
    sounds[activeBiome][sound].play();
  } 
  else {
    sounds[activeBiome][sound].stop();
  }
  // Mark button as selected or deselected
  if (button) {
    //SetSelected(button, sound);
  }
}

let timer;

// Reset whole scene for listening again
function ResetScene() {
  timer = 0;
  pointsReached = 0;

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

function Timer() {
  running = true;
  timer += 1 / totalTime / fps;

  if (timer > 1) {
    timer = 1;
    running = false;

    // Stop all sounds for active biome
    for (let i = 0; i < SOUND_COUNT; i++) {
      sounds[activeBiome][i].stop();
    }
    ToFinal()
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
    if (pointsReached < timelinePoints.length) {
      if (window.innerWidth * timer > timelinePoints[pointsReached]) {
        let id = "sound" + pointsReached;

        DisableButton(id);
        pointsReached++;
      }
    }
  }
  UpdateTimeline();
}

function UpdateTimeline() {
  $("#timeline-fill").css("width", window.innerWidth * timer);
}

function draw() {}

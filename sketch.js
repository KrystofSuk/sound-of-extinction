let soundsA = []

function setupSceneA() {
  soundsA[0] = loadSound('data/hardy96a')
  soundsA[1] = loadSound('data/ambient')
}

function preload() {
  soundFormats('mp3', 'ogg')

  setupSceneA()
}


function setup() {
  let cnv = createCanvas(500, 500)

  background("#555")

  fft = new p5.FFT();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    soundsA[1].play()
  } else if (keyCode === RIGHT_ARROW) {
    soundsA[0].play()
  }
}

function draw() {
  background("#555")
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width)
    let h = map(spectrum[i], 0, 255, 255, 0)
    fill(h, h, h);
    rect(x, height/2, width / spectrum.length, 50)
    rect(x , height- (255-h), width / spectrum.length, 255-h)
  }

}
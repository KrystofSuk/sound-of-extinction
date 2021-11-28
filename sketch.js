let soundsA = []


function setupSceneA() {
  soundsA[0] = loadSound('data/hardy96a')
  soundsA[1] = loadSound('data/ambient')
  soundsA[2] = loadSound('data/base.wav')
}

function preload() {
  soundFormats('mp3', 'wav')

  setupSceneA()
}

let cnv

function setup() {
  cnv = createCanvas(500, 500)
  cnv.parent('spectrogram-area')


  fft = new p5.FFT()
}

function DisableButton(id){
  $("#"+id).prop('disabled', true)
}

function PlaySound(i, instant = false) {
  if(!running && !instant)
    return
  soundsA[i].play()
}

let timer = 0

let totalTime = 30
let fps = 24
let running = false


function Timer() {
  running = true
  timer += 1/totalTime/fps
  if(timer > 1){
    timer = 1
    soundsA[0].stop()
    soundsA[1].stop()
    soundsA[2].stop()
    running = false
  }
  else{
    let spectrum = fft.analyze()

    translate(width / 2, height / 2)

    rotate((PI * 2 * timer - PI/2))

    noStroke()
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, width/2 - 5, 0)
      let h = map(spectrum[i], 0, 255, 255, 0)
      fill(h, h, h)
      rect(x, 0, width / spectrum.length, 2)
    }

    setTimeout(Timer, 1000/fps)



    //Dummy disabling of buttons
    if(timer>0.5){
      DisableButton("scene-a-sound-a")
    }
    if(timer > 0.75){
      DisableButton("scene-a-sound-b")
    }

  }
  UpdateTimeline()
}

function UpdateTimeline(){
  $("#timeline-fill").css('width', window.innerWidth * timer)
}


function draw() {

}
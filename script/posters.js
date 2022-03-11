var poster = function (p) { 
    var x = 100;
    var y = 100;
    let cnv;
    var pg;

    p.setup = function () {
        cnv = p.createCanvas(508, 719);
        cnv.parent("final-spectrogram-area");
        pg = createGraphics(RENDER_SIZE, RENDER_SIZE);
        cnv.hide()
    };

    p.draw = function () {
    };

    p.copyVisualisation = function(graphics, a){
        pg.copy(graphics, 0,0, RENDER_SIZE, RENDER_SIZE, 0,0, RENDER_SIZE, RENDER_SIZE)
        y = a

        p.background(255);
        p.image(pg, 0, y, 508, 508);
    }

    p.setCSS = function(id){
        cnv.id(id)
    }

    p.show = function(){
        cnv.show()
    }

    p.hide = function(){
        cnv.hide()
    }

    p.saveImage = function(){
        p.save("Sound of Extinction")
    }
};

let currentPoster = 0

let posters = [
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area')
]


// Save created spectrogram
function DownloadImage() {
    posters[currentPoster].saveImage()
}

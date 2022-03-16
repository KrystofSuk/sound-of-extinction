var poster = function (p) {
    var x = 100;
    var y = 100;
    let cnv;
    var spectrogram;
    var pg;

    let texture;
    let tst;
    let fontRegular, fontLight, fontHeavy;

    p.preload = function () {
        texture = loadImage('../data/img/texture.png');
        tst = loadImage('../data/img/tst.png');

        fontRegular = loadFont('../fonts/iosevka-ss06-regular.ttf');
        fontLight = loadFont('../fonts/iosevka-ss06-light.ttf');
        fontHeavy = loadFont('../fonts/iosevka-ss06-heavy.ttf');
    }

    p.setup = function () {
        cnv = p.createCanvas(508, 719);
        cnv.parent("final-spectrogram-area");
        pg = createGraphics(4960, 7016);
        spectrogram = createGraphics(RENDER_SIZE, RENDER_SIZE);
        cnv.hide()
    };

    p.draw = function () {};

    p.visualise = function (graphics, type) {
        //spectrogram.copy(graphics, 0,0, RENDER_SIZE, RENDER_SIZE, 0,0, RENDER_SIZE, RENDER_SIZE)

        p.generate(type)
    }

    p.setCSS = function (id) {
        cnv.id(id)
    }

    p.show = function () {
        cnv.show()
    }

    p.hide = function () {
        cnv.hide()
    }

    p.saveImage = function () {
        pg.save("Sound of Extinction")
    }

    p.generate = function (type) {
        //Create background
        p.background(type)

        //Add visualisation
        p.visualisation(type)

        //Add graphic elements
        p.elements(type)

        //Add texts
        p.texts(type)

        //pg.image(spectrogram, 0, 0, 4960, 4960)
        p.image(pg, 0, 0, 508, 719);
    }

    p.drawText = function(message, fontXPos, fontYPos, charSpacing) {
        for (let i = 0; i < message.length; i++) {
            pg.text(message[i], fontXPos, fontYPos);
            fontXPos += charSpacing;
        }
    }

    p.texts = function (type) {
        if (type == 0) {

            pg.textFont(fontHeavy).fill("#3d3d3d").strokeWeight(0).textSize(582).textAlign(LEFT, CENTER);
            p.drawText('SOUND', 1395, 4531+225, 470)

            pg.textFont(fontHeavy).fill("#ffffff").strokeWeight(0).textSize(582).textAlign(CENTER, CENTER);
            p.drawText('EXTINCTION', 495+149, 5825+225, 408)

            pg.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(282).textAlign(LEFT, TOP);
            p.drawText('of', 2306, 5241 - 34, 200)

            pg.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(60).textAlign(LEFT, TOP);
            p.drawText('bachelor’s project', 2153, 6768 - 6, 36)

            pg.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(90).textAlign(LEFT, TOP);
            p.drawText('Kryštof Šuk', 200, 259, 54)

            pg.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(72).textAlign(LEFT, TOP);

            p.drawText("sounds of:", 3954, 268, 51)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                p.drawText(NAMES[activeBiome][index].toLowerCase(), 3954, 268 + 84 + 84*index, 51)
            }

        } else if (type == 1) {} else if (type == 2) {}
    }

    p.elements = function (type) {
        if (type == 1) {
            pg.image(tst, -100, -100, 3538, 3538)
        } else if (type == 2) {
            pg.image(tst, -100, -100, 3538, 3538)
        }
    }

    p.visualisation = function (type) {
        if (type == 0) {
            pg.image(tst, 711, 590, 3538, 3538)
        } else if (type == 1) {
            pg.image(tst, -100, -100, 3538, 3538)
        } else if (type == 2) {
            pg.image(tst, -100, -100, 3538, 3538)
        }
    }

    p.background = function (type) {
        if (type == 0) {
            pg.background(255)

            pg.fill("#3e3e3e")
            pg.noStroke()

            pg.rect(0, 5727, 5965, 804)

        } else if (type == 1) {
            pg.background("#232323")
        } else if (type == 2) {
            pg.background("#232323")
        }

        //Texture
        p.translate(p.width / 2, p.height / 2);
        p.rotate(PI / 180 * 90);

        pg.image(texture, -100, -100, 5572, 7120)

        p.resetMatrix();
    }
};

let currentPoster = 0

let posters = [
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area')
]


// Save created spectrogram
function DownloadImage() {
    posters[currentPoster].saveImage()
}
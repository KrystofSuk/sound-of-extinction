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
        if(graphics != null)
        spectrogram.copy(graphics, 0,0, RENDER_SIZE, RENDER_SIZE, 0,0, RENDER_SIZE, RENDER_SIZE)

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

            pg.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(72).textAlign(RIGHT, TOP);

            pg.text("sounds of:", 4760, 268)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                pg.text(NAMES[activeBiome][index].toLowerCase(), 4760, 268 + 84 + 84*index)
            }

        } else if (type == 1) {
            
            pg.textFont(fontHeavy).fill("#ffffff").strokeWeight(0).textSize(1204).textAlign(LEFT, TOP);
            pg.blendMode(DIFFERENCE);


            p.drawText('SOUND', 256-17, 1989-120, 968)
            pg.blendMode(BLEND);

            pg.textFont(fontHeavy).fill("#eb4860").strokeWeight(0).textSize(582).textAlign(LEFT, TOP);
            p.drawText('EXTIN', 714, 5298-56, 810)
            p.drawText('CTION', 714, 5298-56 +697, 810)

            pg.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(122).textAlign(LEFT, TOP);
            p.drawText('OF', 2407, 5116 - 12, 84)

            pg.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(60).textAlign(LEFT, TOP);
            p.drawText('bachelor’s project', 2153, 6768 - 6, 36)

            pg.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(90).textAlign(LEFT, TOP);
            p.drawText('Kryštof Šuk', 200, 259, 54)

            pg.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(72).textAlign(RIGHT, TOP);

            pg.text("sounds of:", 4760, 268)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                pg.text(NAMES[activeBiome][index].toLowerCase(), 4760, 268 + 84 + 84*index)
            }
        
        } else if (type == 2) {

            
            pg.textFont(fontHeavy).fill("#ffffff").strokeWeight(0).textSize(1004).textAlign(LEFT, TOP);

            pg.blendMode(DIFFERENCE);
            p.drawText('sound', 176, 357-100, 818)
            pg.blendMode(BLEND);

            pg.textFont(fontHeavy).fill("#eb4860").strokeWeight(0).textSize(831).textAlign(LEFT, TOP);

            pg.translate(p.width / 2, p.height / 2);
            pg.rotate(PI / 180 * -90);

    
            pg.blendMode(EXCLUSION );
            p.drawText('extinction', -6300, 3906, 644)
            pg.blendMode(BLEND);
            
            pg.resetMatrix();

            pg.textFont(fontRegular).fill("#ffffff").strokeWeight(0).textSize(322).textAlign(LEFT, TOP);

            pg.blendMode(DIFFERENCE);
            p.drawText('of', 2280, 2829, 214)
            pg.blendMode(BLEND);

            pg.textFont(fontHeavy).fill("#dcdcdc").strokeWeight(0).textSize(60).textAlign(LEFT, TOP);
            p.drawText('bachelor’s project', 252, 6715, 36+20)

            pg.textFont(fontHeavy).fill("#dcdcdc").strokeWeight(0).textSize(90).textAlign(LEFT, TOP);
            p.drawText('kryštof šuk', 252, 5404, 54+20)

            pg.textFont(fontHeavy).fill("#dcdcdc").strokeWeight(0).textSize(72).textAlign(LEFT, TOP);

            p.drawText("sounds of:", 252, 5807, 51+20)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                p.drawText(NAMES[activeBiome][index].toLowerCase(), 252, 5807 + 84 + 84*index, 51+20)
            }

        }
    }

    p.elements = function (type) {
        if (type == 1) {
            //pg.image(tst, -100, -100, 3538, 3538)

            pg.strokeWeight(12).stroke("#999999").fill("#00000000")
            pg.circle(2480, 2588, 4468)
            
            pg.strokeWeight(8).stroke("#999999aa").fill("#00000000")
            pg.circle(2480, 2588, 4674)
            
            pg.strokeWeight(4).stroke("#99999955").fill("#00000000")
            pg.circle(2480, 2588, 4880)

        } else if (type == 2) {
            //pg.image(tst, -100, -100, 3538, 3538)
            pg.strokeWeight(1).stroke("#7b7b7b").fill("#7b7b7b")
            let max = random(16, 36)
            for (let index = 0; index < max; index++) {
                pg.rect(0, 1640 + index * 44, 1450 + random(-1400, 400), 8)
            }
        }
    }

    p.visualisation = function (type) {
        if (type == 0) {
            pg.image(spectrogram, 711, 590, 3538, 3538)
        } else if (type == 1) {
            pg.blendMode(DODGE);
            pg.image(spectrogram, 318, 421, 4339, 4339)
            pg.blendMode(BLEND);
        } else if (type == 2) {

            pg.push();
            pg.scale(1, -1)
            pg.blendMode(DIFFERENCE);
            pg.image(spectrogram, -869, -3711-7016, 6704, 6704)
            pg.blendMode(BLEND);
            pg.pop();
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

            pg.fill("#cccccc")
            pg.noStroke()

            pg.rect(2480, 0, 2480, 7016)
        }

        //Texture
        pg.image(texture, -100, -100, 5572, 7120)
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
/**
 * Function for creating P5.js instance of sketch for poster 
 * @param {object} sk sketch from P5.js
 */
var poster = function (sk) {
    let canvas
    var spectrogram
    var graphics

    // Graphical elements
    let grunge
    let fontRegular, fontLight, fontHeavy


    //--------------------------------P5-------------------------------------------
    sk.preload = function () {
        grunge = loadImage('../data/img/texture.png')

        fontRegular = loadFont('../fonts/iosevka-ss06-regular.ttf')
        fontLight = loadFont('../fonts/iosevka-ss06-light.ttf')
        fontHeavy = loadFont('../fonts/iosevka-ss06-heavy.ttf')
    }

    sk.setup = function () {
        canvas = sk.createCanvas(508, 719)
        canvas.parent("final-spectrogram-area")
        graphics = createGraphics(4960, 7016)
        spectrogram = createGraphics(RENDER_SIZE, RENDER_SIZE)
        canvas.hide()
    }

    sk.visualise = function (graphics, type) {
        if (graphics != null)
            spectrogram.copy(graphics, 0, 0, RENDER_SIZE, RENDER_SIZE, 0, 0, RENDER_SIZE, RENDER_SIZE)

        sk.generate(type)
    }


    //--------------------------------UI-------------------------------------------
    sk.show = function () {
        canvas.show()
    }

    sk.hide = function () {
        canvas.hide()
    }

    sk.saveImage = function () {
        graphics.save("Sound of Extinction")
    }


    //--------------------------------Generation-------------------------------------------
    sk.generate = function (type) {
        // Create background
        sk.generateBackground(type)

        // Add visualisation
        sk.generateVisualisation(type)

        // Add graphic elements
        sk.generateElements(type)

        // Add texts
        sk.generateTexts(type)

        // Set output to canvas
        sk.image(graphics, 0, 0, 508, 719)
    }

    // Function to draw text with letter spacing
    sk.drawText = function (text, x, y, spacing) {
        for (let i = 0; i < text.length; i++) {
            graphics.text(text[i], x, y)
            x += spacing
        }
    }

    // Function for generating different texts based on poster type
    sk.generateTexts = function (type) {
        if (type == 0) {
            graphics.textFont(fontHeavy).fill("#3d3d3d").strokeWeight(0).textSize(582).textAlign(LEFT, CENTER)
            sk.drawText('SOUND', 1395, 4531 + 225, 470)

            graphics.textFont(fontHeavy).fill("#ffffff").strokeWeight(0).textSize(582).textAlign(CENTER, CENTER)
            sk.drawText('EXTINCTION', 495 + 149, 5825 + 225, 408)

            graphics.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(282).textAlign(LEFT, TOP)
            sk.drawText('of', 2306, 5241 - 34, 200)

            graphics.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(60).textAlign(LEFT, TOP)
            sk.drawText('bachelor’s project', 2153, 6768 - 6, 36)

            graphics.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(90).textAlign(LEFT, TOP)
            sk.drawText('Kryštof Šuk', 200, 259, 54)

            graphics.textFont(fontLight).fill("#3d3d3d").strokeWeight(0).textSize(72).textAlign(RIGHT, TOP)

            graphics.text("sounds of:", 4760, 268)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                graphics.text(NAMES[activeBiome][index].toLowerCase(), 4760, 268 + 84 + 84 * index)
            }

        } else if (type == 1) {
            graphics.textFont(fontHeavy).fill("#ffffff").strokeWeight(0).textSize(1204).textAlign(LEFT, TOP)
            graphics.blendMode(DIFFERENCE)


            sk.drawText('SOUND', 256 - 17, 1989 - 120, 968)
            graphics.blendMode(BLEND)

            graphics.textFont(fontHeavy).fill("#eb4860").strokeWeight(0).textSize(582).textAlign(LEFT, TOP)
            sk.drawText('EXTIN', 714, 5298 - 56, 810)
            sk.drawText('CTION', 714, 5298 - 56 + 697, 810)

            graphics.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(122).textAlign(LEFT, TOP)
            sk.drawText('OF', 2407, 5116 - 12, 84)

            graphics.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(60).textAlign(LEFT, TOP)
            sk.drawText('bachelor’s project', 2153, 6768 - 6, 36)

            graphics.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(90).textAlign(LEFT, TOP)
            sk.drawText('Kryštof Šuk', 200, 259, 54)

            graphics.textFont(fontLight).fill("#999999").strokeWeight(0).textSize(72).textAlign(RIGHT, TOP)

            graphics.text("sounds of:", 4760, 268)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                graphics.text(NAMES[activeBiome][index].toLowerCase(), 4760, 268 + 84 + 84 * index)
            }

        } else if (type == 2) {
            graphics.textFont(fontHeavy).fill("#ffffff").strokeWeight(0).textSize(1004).textAlign(LEFT, TOP)

            graphics.blendMode(DIFFERENCE)
            sk.drawText('sound', 176, 357 - 100, 818)
            graphics.blendMode(BLEND)

            graphics.textFont(fontHeavy).fill("#eb4860").strokeWeight(0).textSize(831).textAlign(LEFT, TOP)

            graphics.translate(sk.width / 2, sk.height / 2)
            graphics.rotate(PI / 180 * -90)


            graphics.blendMode(EXCLUSION)
            sk.drawText('extinction', -6300, 3906, 644)
            graphics.blendMode(BLEND)

            graphics.resetMatrix()

            graphics.textFont(fontRegular).fill("#ffffff").strokeWeight(0).textSize(322).textAlign(LEFT, TOP)

            graphics.blendMode(DIFFERENCE)
            sk.drawText('of', 2280, 2829, 214)
            graphics.blendMode(BLEND)

            graphics.textFont(fontHeavy).fill("#dcdcdc").strokeWeight(0).textSize(60).textAlign(LEFT, TOP)
            sk.drawText('bachelor’s project', 252, 6715, 36 + 20)

            graphics.textFont(fontHeavy).fill("#dcdcdc").strokeWeight(0).textSize(90).textAlign(LEFT, TOP)
            sk.drawText('kryštof šuk', 252, 5404, 54 + 20)

            graphics.textFont(fontHeavy).fill("#dcdcdc").strokeWeight(0).textSize(72).textAlign(LEFT, TOP)

            sk.drawText("sounds of:", 252, 5807, 51 + 20)

            for (let index = 0; index < NAMES[activeBiome].length; index++) {
                sk.drawText(NAMES[activeBiome][index].toLowerCase(), 252, 5807 + 84 + 84 * index, 51 + 20)
            }

        }
    }

    // Function for generating graphical elements like circles or lines based on poster type
    sk.generateElements = function (type) {
        if (type == 1) {
            graphics.strokeWeight(12).stroke("#999999").fill("#00000000")
            graphics.circle(2480, 2588, 4468)

            graphics.strokeWeight(8).stroke("#999999aa").fill("#00000000")
            graphics.circle(2480, 2588, 4674)

            graphics.strokeWeight(4).stroke("#99999955").fill("#00000000")
            graphics.circle(2480, 2588, 4880)

        } else if (type == 2) {
            graphics.strokeWeight(1).stroke("#7b7b7b").fill("#7b7b7b")
            let max = random(16, 36)
            for (let index = 0; index < max; index++) {
                graphics.rect(0, 1640 + index * 44, 1450 + random(-1400, 400), 8)
            }
        }
    }

    // Function for adding visualisation to poster based on poster type
    sk.generateVisualisation = function (type) {
        if (type == 0) {
            graphics.image(spectrogram, 711, 590, 3538, 3538)
        } else if (type == 1) {
            graphics.blendMode(DODGE)
            graphics.image(spectrogram, 318, 421, 4339, 4339)
            graphics.blendMode(BLEND)
        } else if (type == 2) {

            graphics.push()
            graphics.scale(1, -1)
            graphics.blendMode(DIFFERENCE)
            graphics.image(spectrogram, -869, -3711 - 7016, 6704, 6704)
            graphics.blendMode(BLEND)
            graphics.pop()
        }
    }

    // Function for generating backgrounds based on poster type
    sk.generateBackground = function (type) {
        if (type == 0) {
            graphics.background(255)

            graphics.fill("#3e3e3e")
            graphics.noStroke()

            graphics.rect(0, 5727, 5965, 804)

        } else if (type == 1) {
            graphics.background("#232323")
        } else if (type == 2) {
            graphics.background("#232323")

            graphics.fill("#cccccc")
            graphics.noStroke()

            graphics.rect(2480, 0, 2480, 7016)
        }

        // Texture
        graphics.image(grunge, -100, -100, 5572, 7120)
    }
}

let currentPoster = 0

let posters = [
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area'),
    new p5(poster, 'final-spectrogram-area')
]

/**
 * Function for saving resulting poster
 */
function downloadImage() {
    posters[currentPoster].saveImage()
}
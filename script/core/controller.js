let loading = $("#loading-page");
let intro = $("#intro-page");
let menu = $("#menu-page");
let tutorial = $("#tutorial-page");
let visual = $("#visual-page");
let message = $("#message-page");
let final = $("#final-page")

intro.hide();
menu.hide();
tutorial.hide()
visual.hide();
message.hide();
final.hide()

// Flag for tutorial display
let firstTime = true

// Switch to intro
function toIntro() {
    loading.fadeOut(1000)
    intro.delay(1000).fadeIn(500)
}

// Switch to biome menu
function toMenu(fromFinish = true) {
    if(fromFinish)
        final.fadeOut(500)
    else
        intro.fadeOut(500)
    menu.delay(500).fadeIn(500)
}

function toVisualisation(biome, id){
    visual.show()

    resetScene()

    generatePoints()
    setBiome(biome)
    
    for (let i = 0; i < SOUND_COUNT; i++) {
        sounds[activeBiome][i].setVolume(0, 0, 0)
    }

    visual.hide()

    visual.delay(500).fadeIn(800,()=>{
        setTimeout(visualisationTick, 1000 / 24)
        playSound(0, undefined, true)
    })
}

// Switch to visualization page
function toBiome(biome, id) {
    menu.fadeOut(500)

    if(firstTime){

        tutorial.delay(500).fadeIn()
        firstTime = false
        setTimeout(()=>{
            tutorial.fadeOut(500)
            toVisualisation(biome, id)
        }, TUTORIAL_TIME)

    }else{
        toVisualisation(biome, id)
    }

}

// Switch to final page
function toFinal() {
    $("#final-biome").html(SCENE_NAMES[activeBiome])

    visual.fadeOut(1000)
    message.delay(1000).fadeIn(800)
    
    $("#dots").html("")
    for (let index = 0; index < posters.length; index++) {
        $("#dots").append('<button onclick="displayPosterID(' + index + ')" class="dot-button" id="dot' + index + '"></button>')
    }


    setTimeout(() => {
        message.fadeOut(800)

        displayPosterID(0)


        final.delay(800).fadeIn(800)
    }, MESSAGE_TIME)
}

// Swipe through posters in direction
function displayPoster(direction) {
    posters[currentPoster].hide()
    $("#dot" + currentPoster).removeClass("dot-active")

    if (direction) {
        currentPoster++
    } else {
        currentPoster--
    }

    if (currentPoster < 0)
        currentPoster = 0
    if (currentPoster == posters.length)
        currentPoster = posters.length - 1

    updateArrows()

    posters[currentPoster].show()
    $("#dot" + currentPoster).addClass("dot-active")
}

// Update arrows on selecting posters
function updateArrows(){
    if(currentPoster == 0){
        $("#left-arrow").hide()
        $("#right-arrow").show()
    }
    else if(currentPoster == posters.length - 1){
        $("#left-arrow").show()
        $("#right-arrow").hide()
    }
    else{
        $("#left-arrow").show()
        $("#right-arrow").show()
    }
}

// Display individual poster by ID
function displayPosterID(id) {
    posters[currentPoster].hide()
    $("#dot" + currentPoster).removeClass("dot-active")

    currentPoster = id

    updateArrows()

    posters[currentPoster].show()
    $("#dot" + currentPoster).addClass("dot-active")
}

// Dynamically generates points on timeline and saves their x coordinates
function generatePoints() {

    $(".timeline-rotational-point").remove()
    $(".fixed-bottom timeline-point").remove()

    for (let i = 0; i < MARGINS.length; i++) {
        let point = document.createElement('div')

        point.id = 'point' + i
        point.className = 'fixed-bottom timeline-point'
        point.style.marginLeft = str(MARGINS[i]) + "%"

        document.getElementById("timeline-base").appendChild(point)


        let point2 = document.createElement('div')

        let angle = MARGINS[i] * 3.6 - 1 + 2


        point2.id = 'point-r' + i
        point2.className = 'timeline-rotational-point'


        document.getElementById("timeline-rotational").appendChild(point2)

        $("#point-r" + i).css("transform",
            "rotate(" + angle + "deg)"
        )
    }
}

// Updates the loading number
function updateLoading(progress) {
    $("#loading-progress").html(progress + "%")
}
let loading = $("#loading-page");
let intro = $("#intro-page");
let menu = $("#menu-page");
let visual = $("#visual-page");
let message = $("#message-page");
let final = $("#final-page");

intro.hide();
menu.hide();
visual.hide();
message.hide();
final.hide();

// Switch to intro
function ToIntro() {
    loading.hide();
    intro.show();
}

// Switch to biome menu
function ToMenu() {
    final.hide();
    intro.hide();
    menu.show();
}

// Switch to visualization page
function ToBiome(biome, id) {
    menu.hide();
    visual.show();

    ResetScene();

    //ChangeTitle(biome, id);
    GeneratePoints();
    SetBiome(biome);


    setTimeout(Timer, 1000 / 24);
    PlaySound(0, undefined, true);
    for (let i = 0; i < SOUND_COUNT; i++) {
        sounds[activeBiome][i].setVolume(1, 0, 0);
    }
}

// Switch to final page
function ToFinal() {
    $("#final-biome").html(SCENE_NAMES[activeBiome])

    menu.hide();
    visual.hide();
    message.show();
    
    $("#dots").html("")
    for (let index = 0; index < posters.length; index++) {
        $("#dots").append('<button onclick="DisplayPosterID(' + index + ')" class="dot-button" id="dot' + index + '"></button>')
    }


    setTimeout(() => {
        message.hide();

        DisplayPosterID(0)


        final.show();
    }, 100)
}


function DisplayPoster(direction) {
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

    UpdateArrows()

    posters[currentPoster].show()
    $("#dot" + currentPoster).addClass("dot-active")
}

function UpdateArrows(){

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

function DisplayPosterID(id) {
    posters[currentPoster].hide()
    $("#dot" + currentPoster).removeClass("dot-active")

    currentPoster = id

    UpdateArrows()

    posters[currentPoster].show()
    $("#dot" + currentPoster).addClass("dot-active")
}

// Changes the title of vizualization page according to chosen biome
function ChangeTitle(biome, id) {
    if (!document.getElementById) {
        return;
    }
    var title = document.getElementById(id).value;

    var biomeHeading = document.getElementById("biome-heading");
    biomeHeading.firstChild.nodeValue = title.toUpperCase();
}

// Dynamically generates points on timeline and saves their x coordinates
function GeneratePoints() {
    let margins = [40, 50, 75, 90];

    for (let i = 0; i < margins.length; i++) {
        let point = document.createElement('div');

        point.id = 'point' + i;
        point.className = 'fixed-bottom timeline-point';
        point.style.marginLeft = str(margins[i]) + "%";

        document.getElementById("timeline-base").appendChild(point);


        let point2 = document.createElement('div');

        let angle = margins[i] * 3.6 - 1 + 2

        console.log(angle)

        point2.id = 'point-r' + i;
        point2.className = 'timeline-rotational-point';


        document.getElementById("timeline-rotational").appendChild(point2);

        $("#point-r" + i).css("transform",
            "rotate(" + angle + "deg)"
        );
    }
}

function UpdateLoading(progress) {
    $("#loading-progress").html(progress + "%")
}
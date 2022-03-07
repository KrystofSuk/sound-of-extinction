let loading = $("#loading-page");
let intro = $("#intro-page");
let menu = $("#menu-page");
let visual = $("#visual-page");
let final = $("#final-page");

intro.hide();
menu.hide();
visual.hide();
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

    ChangeTitle(biome, id);
    GeneratePoints();
    SetBiome(biome);

    setTimeout(Timer, 1000 / 24);
    PlaySound(0, undefined, true);
}

// Switch to final page
function ToFinal() {
    visual.hide();
    final.show();
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
    }
}

function UpdateLoading(progress){
    $("#loading-progress").html(progress + "%")
}
// Debug go to final poster page
function finalDBG(){
    intro.hide();
    menu.hide();
    tutorial.hide()
    visual.hide();
    message.hide();
    final.hide();
    
    for (let p = 0; p < posters.length; p++) {
        posters[p].visualise(null, p);
    }

    $("#dots").html("")
    for (let index = 0; index < posters.length; index++) {
        $("#dots").append('<button onclick="displayPosterID(' + index + ')" class="dot-button" id="dot' + index + '"></button>')
    }

    displayPosterID(0)
    final.fadeIn(800)
}
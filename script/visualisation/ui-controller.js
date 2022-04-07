/**
 * Function for updating timeline progress of visualisation
 */
function updateTimeline() {
    let angle = timer / 1 * 360 + .1

    // Horizontal
    $("#timeline-fill").css("width", window.innerWidth * timer);

    // Rotational
    $("#timeline-rotational-fill").css("background",
        "conic-gradient(var(--gray)" + angle + "deg, transparent " + angle + "deg 360deg)"
    );
}

/**
 * Function that enable button specified by id for visualisation
 * @param {string} id identifier of the button
 */
function enableButton(id) {
    $("#" + id).css("background",
        "linear-gradient(to right, var(--dark-gray) 100%, var(--light-gray) 0%)"
    );

    $("#" + id).prop("disabled", false);
    $("#" + id).css("opacity", 1);
}

/**
 * Function that disable button specified by id for visualisation
 * @param {string} id identifier of the button
 */
function disableButton(id) {
    $("#" + id).prop("disabled", true);
    $("#" + id).animate({
        opacity: "0"
    }, 500)
}

/**
 * Function for showing progress of audio sample in the button itself
 * @param {string} button identifier of the button
 * @param {int} sound index of the sound for desired button
 */
function progressButton(button, sound) {
    let percentage = sounds[activeBiome][sound].currentTime() / sounds[activeBiome][sound].duration() * 100

    $("#" + button).css("background",
        "linear-gradient(to right, var(--dark-gray)" + percentage + "%, var(--light-gray) " + percentage + "%)"
    );

    if (sounds[activeBiome][sound].isPlaying()){
        setTimeout(() => {
            progressButton(button, sound)
        }, 1000 / 60)
    }
    else{
        $("#" + button).css("background",
            "linear-gradient(to right, var(--dark-gray) 100%, var(--light-gray) 0%)"
        )

        $("#" + button).prop("disabled", false)
    }
}

// Control button clicked
/**
 * Function for button click and its disabling when user clicks the button for audio playback, calls {@link progressButton}
 * @param {string} button identifier of the button
 * @param {int} sound index of the sound for desired button
 */
function buttonClick(button, sound) {
    $("#" + button).prop("disabled", true)

    progressButton(button, sound)
}
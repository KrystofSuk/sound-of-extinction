// Update timeline progress
function updateTimeline() {
    let angle = timer / 1 * 360 + .1

    // Horizontal
    $("#timeline-fill").css("width", window.innerWidth * timer);

    // Rotational
    $("#timeline-rotational-fill").css("background",
        "conic-gradient(var(--gray)" + angle + "deg, transparent " + angle + "deg 360deg)"
    );
}

// Enable button specified by id
function enableButton(id) {
    $("#" + id).css("background",
        "linear-gradient(to right, var(--dark-gray) 100%, var(--light-gray) 0%)"
    );

    $("#" + id).prop("disabled", false);
    $("#" + id).css("opacity", 1);
}

// Disable button specifed by id
function disableButton(id) {
    $("#" + id).prop("disabled", true);
    $("#" + id).animate({
        opacity: "0"
    }, 500)
}

// Visualise audio progress specific in button
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
function buttonClick(button, sound) {
    $("#" + button).prop("disabled", true)

    progressButton(button, sound)
}
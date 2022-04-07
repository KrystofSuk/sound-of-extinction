
/**
 * Misc function for calculating vh units
 */
 function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
}

$(document).ready(() => {
    setDocHeight();
})

window.addEventListener('resize', function () {
    setDocHeight();
})

window.addEventListener('orientationchange', function () {
    setDocHeight();
})

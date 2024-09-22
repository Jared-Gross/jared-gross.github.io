document.addEventListener("DOMContentLoaded", function () {
    function scaleApp() {
        let scaleRatio = Math.min(window.innerWidth / 500, window.innerHeight / 1200);
        scaleRatio = Math.min(scaleRatio, 1);
        document.body.style.transform = `scale(${scaleRatio})`;
        document.body.style.transformOrigin = "top left";  // Ensures scaling starts from the top-left corner
        document.body.style.width = `${100 / scaleRatio}%`;  // Adjust the width to avoid clipping
        document.body.style.height = `${100 / scaleRatio}%`; // Adjust the height similarly
    }
    scaleApp();

    window.addEventListener("resize", scaleApp);
});
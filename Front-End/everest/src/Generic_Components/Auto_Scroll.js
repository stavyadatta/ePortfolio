import React from "react";

function autoScroll(target, duration) {
    const dest = document.querySelector(target);
    const targetPosition = dest.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const dist = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) {startTime = currentTime; }
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, dist, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) { requestAnimationFrame(animation); }
    }

    function ease(t,b,c,d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

export default autoScroll;
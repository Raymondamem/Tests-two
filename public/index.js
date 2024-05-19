let newDuration = 1;
const scrollers = document.querySelectorAll(".scroller");
const scroller__inner__lis = document.querySelectorAll(".scroller > .scroller__inner > li");
const dummyButtonWrapper = document.querySelector(".dummyButtonWrapper");
const countdown = document.querySelector('.countdown');
let increaseSpeed = null;
let decreaseSpeed = null;
let starter = null;
let hasRan = false;

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

setupIntervals();
// starterFunc();
let options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: .5,
};

const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
        if (entry.isIntersecting) io.unobserve(entry.target);
    });
}, options);

scroller__inner__lis.forEach((el) => {
    io.observe(el);
});

function setupIntervals() {
    if (starter) clearTimeout(starter);
    const scrollerFast = document.querySelector('.scroller[data-speed="fast"]');
    const scrollerInner = scrollerFast.querySelector('.scroller__inner');
    if (hasRan === false) {
        scrollerFast.classList.remove('stopped');
        increaseSpeed = setInterval(function () {
            newDuration *= 0.5;
            if (newDuration < 0.05) newDuration = 0.05;
            if (newDuration >= 0.05) {
                hasRan = true;
                clearInterval(increaseSpeed);
                setupIntervals();
            }
            scrollerInner.style.animationDuration = `${newDuration}s`;
            scrollerFast.classList.toggle('stopped', newDuration >= 60);
        }, 1000);
    } else {
        console.log((0.5 * 150), newDuration)
        decreaseSpeed = setInterval(function () {
            newDuration /= 0.5;
            if (newDuration > (0.5 * 150)) newDuration = (0.5 * 150);
            scrollerInner.style.animationDuration = `${newDuration}s`;
            scrollerFast.classList.toggle('stopped', newDuration >= 60);
            if (newDuration >= 60) {
                starter = setTimeout(function () {
                    hasRan = false;
                    newDuration = 1;
                    scrollerFast.classList.remove('stopped');
                    clearInterval(decreaseSpeed);
                    setupIntervals();
                }, 10000);
            }
        }, 5000);
    }
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

function starterFunc() {
    let i = 0;
    let starterCountDown = setInterval(function () {
        countdown.querySelector('.timer').innerHTML = `0${i}`;
        i++;
        (i >= 10) ? i = 0 : i;
        (i >= 10) ? clearInterval(starterCountDown) : clearInterval(null);
    }, 1000);
    return i;
}
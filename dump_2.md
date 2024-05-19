<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinit Scroller 🥂</title>
    <style>
        .scroller {
            max-width: 3000px;
            position: relative;
        }

        .scrollArea {
            position: absolute;
            top: 0;
            bottom: 0;
            background: rgba(255, 0, 0, .4);
            width: 200px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 5;
        }

        .scroller__inner {
            padding-block: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 3rem;
        }

        .scroller[data-animated="true"] {
            overflow: hidden;
            -webkit-mask: linear-gradient(90deg,
                    transparent,
                    white 20%,
                    white 80%,
                    transparent);
            mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        }

        .scroller[data-animated="true"] .scroller__inner {
            width: max-content;
            flex-wrap: nowrap;
            animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear infinite;
        }

        .scroller[data-direction="right"] {
            --_animation-direction: reverse;
        }

        .scroller[data-direction="left"] {
            --_animation-direction: forwards;
        }

        .scroller[data-speed="fast"] {
            --_animation-duration: 0s;
        }

        .scroller[data-speed="slow"] {
            --_animation-duration: 60s;
        }

        .stopped {
            /*animation: stop 0s forwards;*/
            animation-play-state: paused !important;
        }

        @keyframes scroll {
            to {
                transform: translate(calc(-50% - 0.5rem));
            }
        }

        @keyframes stop {
            to {
                transform: translate(calc(-50% - 0.5rem));
            }
        }

        .stopped .scroller__inner {
            animation: stop 0s forwards !important;
            animation-play-state: paused !important;
        }

        :root {
            --clr-neutral-100: hsl(0, 0%, 100%);
            --clr-primary-100: hsl(205, 15%, 58%);
            --clr-primary-400: hsl(215, 25%, 27%);
            --clr-primary-800: hsl(217, 33%, 17%);
            --clr-primary-900: hsl(218, 33%, 9%);
        }

        html {
            color-scheme: dark;
        }

        body {
            display: grid;
            min-block-size: 100vh;
            place-content: center;
            font-family: system-ui;
            font-size: 1.125rem;
            background-color: var(--clr-primary-800);
            overflow: hidden;
        }

        .tag-list {
            margin: 0;
            padding-inline: 0;
            list-style: none;
        }

        .tag-list li {
            padding: 1rem;
            background: var(--clr-primary-400);
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem -0.25rem var(--clr-primary-900);
        }

        /* for testing purposed to ensure the animation lined up correctly */
        .test {
            background: red !important;
        }

        .speedBtn {
            border: 1px solid white;
            background-color: var(--clr-primary-800);
            color: white;
            padding: .5rem 1rem;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <h1 class="dummyButtonWrapper"
        style="text-align: center; display: flex; justify-content: center; align-items: center; gap: 1rem;">Infinite
        Scroll Animation <button class="increaseSpeed speedBtn">increaseSpeed speed</button> <button
            class="decreaseSpeed speedBtn">decreaseSpeed speed</button></h1>

    <div class="scroller" data-speed="fast" data-direction="right">
        <div class="scrollArea" id="scrollArea"></div>
        <ul class="tag-list scroller__inner" style="background: white;">
            <li class="tagged">HTML</li>
            <li>CSS</li>
            <li>JS</li>
            <li>SSG</li>
            <li>webdev</li>
            <li>animation</li>
            <li>UI/UX</li>
            <li>Sam</li>
            <li>Yo</li>
            <li>Bright</li>
            <li>Cap</li>
        </ul>
    </div>

    <script>
        let newDuration = 1;
        const scrollers = document.querySelectorAll(".scroller");
        const dummyButtonWrapper = document.querySelector(".dummyButtonWrapper");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        dummyButtonWrapper.addEventListener('click', handleSpeed);

        function handleSpeed(e) {
            const scrollerFast = document.querySelector('.scroller[data-speed="fast"]');
            const scrollerInner = scrollerFast.querySelector('.scroller__inner');

            if (e.target.classList.contains("increaseSpeed")) {
                newDuration *= 0.5;
                if (newDuration < 0.05) newDuration = 0.05;
            } else if (e.target.classList.contains("decreaseSpeed")) {
                newDuration /= 0.5;
                if (newDuration > (0.5 * 200)) newDuration = (0.5 * 200);
            }

            scrollerInner.style.animationDuration = `${newDuration}s`;
            console.log(newDuration);

            if (newDuration >= 60) {
                scrollerFast.classList.add('stopped');
                console.log("stop animation");
            } else if (newDuration < 60) {
                scrollerFast.classList.remove('stopped');
                console.log("start animation");
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

        // Intersection Observer
        let options = {
            root: document.querySelector("#scrollArea"),
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const scrollerFast = entry.target;
                if (entry.isIntersecting) {
                    scrollerFast.classList.add('stopped');
                    console.log("stop animation observer");
                } else {
                    scrollerFast.classList.remove('stopped');
                    console.log("start animation observer");
                }
            });
        }, options);

        scrollers.forEach((scroller) => {
            observer.observe(scroller);
        });
    </script>
</body>

</html>

<!-- ////////////////////////////////splits/////////////////////////////// -->
// let newDuration = 1;
// const scrollers = document.querySelectorAll(".scroller");
// const scroller__inner__lis = document.querySelectorAll(".scroller > .scroller__inner > li");
// const dummyButtonWrapper = document.querySelector(".dummyButtonWrapper");
// let increaseSpeed = null;
// let decreaseSpeed = null;
// let hasRan = false;

// if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//     addAnimation();
// }

// function setupIntervals() {
//     if (hasRan === false) {
//         increaseSpeed = setInterval(function () {
//             newDuration *= 0.5;
//             if (newDuration < 0.05) newDuration = 0.05;
//             if (newDuration >= 0.05) {
//                 hasRan = true;
//                 clearInterval(increaseSpeed);
//                 setupIntervals();
//             }
//             console.log(newDuration, hasRan);
//             handleSpeed();
//         }, 1000);
//     } else {
//         const delay = 10000;
//         decreaseSpeed = setInterval(function () {
//             newDuration /= 0.5;
//             if (newDuration > (0.5 * 200)) newDuration = (0.5 * 200);
//             console.log(newDuration);
//             handleSpeed();
//             delay -= 300;
//         }, delay);
//     }
// }

// setupIntervals();

// function handleSpeed(e) {
//     const scrollerFast = document.querySelector('.scroller[data-speed="fast"]');
//     const scrollerInner = scrollerFast.querySelector('.scroller__inner');

//     // if (e.target.classList.contains("increaseSpeed")) {
//     //     newDuration *= 0.5;
//     //     if (newDuration < 0.05) newDuration = 0.05;
//     // } else if (e.target.classList.contains("decreaseSpeed")) {
//     //     newDuration /= 0.5;
//     //     if (newDuration > (0.5 * 200)) newDuration = (0.5 * 200);
//     // }

//     scrollerInner.style.animationDuration = `${newDuration}s`;

//     if (newDuration >= 60) {
//         scrollerFast.classList.add('stopped');
//         console.log("stop animation");
//     } else if (newDuration < 60) {
//         scrollerFast.classList.remove('stopped');
//         console.log("start animation");
//     }
// }

// function addAnimation() {
//     scrollers.forEach((scroller) => {
//         scroller.setAttribute("data-animated", true);

//         const scrollerInner = scroller.querySelector(".scroller__inner");
//         const scrollerContent = Array.from(scrollerInner.children);

//         scrollerContent.forEach((item) => {
//             const duplicatedItem = item.cloneNode(true);
//             duplicatedItem.setAttribute("aria-hidden", true);
//             scrollerInner.appendChild(duplicatedItem);
//         });
//     });
// }

// let options = {
//     //root: document.querySelector("#scrollArea"),
//     rootMargin: "0px -40% 0px -40%",
//     threshold: .5,
// };

// const io = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("active");
//         } else {
//             entry.target.classList.remove("active");
//         }
//     });
// }, options);

// scroller__inner__lis.forEach((el) => {
//     io.observe(el);
// });
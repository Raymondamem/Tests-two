<!-- 
   PROGRESSIVELY ENHANCED
   If a user has `prefers-reduced-motion: reduced`, there will be no animation
   and the items will wrap, instead of being hidden.
   If they have not opted for reduced motion, the items will be duplicated with JS
   and the duplicated content will have `aria-hidden="true"` to prevent duplicate content
   for screen readers.
   If a user has JS disabled or it fails for whatever reason, they will get the same 
   experience as a user with `prefers-reduced-motion: reduced`, so no content is hidden,
   and there is no animation.
   
   === OPTIONS ===
   CONTROL SPEED 
   If you don't assign anything, it will use a default speed.
   To change the speed, on the `.scroller`
   you can use `data-speed="fast"` or `data-speed="slow"

   CONTROL DIRECTION 
   By default, it will scroll from right to left.
   To change the direction, on the `.scroller`
   you can use `data-direction="right"` (`data-direction="left" also works, but it is the default) 
-->

<h1 style="text-align: center">Infinite Scroll Animation</h1>

<div class="scroller" data-speed="fast">
  <ul class="tag-list scroller__inner">
    <li>HTML</li>
    <li>CSS</li>
    <li>JS</li>
    <li>SSG</li>
    <li>webdev</li>
    <li>animation</li>
    <li>UI/UX</li>
  </ul>
</div>

<div class="scroller" data-direction="right" data-speed="slow">
  <div class="scroller__inner">
    <img src="https://i.pravatar.cc/150?img=1" alt="" />
    <img src="https://i.pravatar.cc/150?img=2" alt="" />
    <img src="https://i.pravatar.cc/150?img=3" alt="" />
    <img src="https://i.pravatar.cc/150?img=4" alt="" />
    <img src="https://i.pravatar.cc/150?img=5" alt="" />
    <img src="https://i.pravatar.cc/150?img=6" alt="" />
  </div>
</div>

<a class="yt" href="https://youtu.be/pKHKQwAsZLI">
  Watch the tutorial
</a>


<!-- ////////////////////////////////////////////////////////////////////////////////// -->


.scroller {
  max-width: 600px;
}

.scroller__inner {
  padding-block: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.scroller[data-animated="true"] {
  overflow: hidden;
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll var(--_animation-duration, 40s)
    var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction="right"] {
  --_animation-direction: reverse;
}

.scroller[data-direction="left"] {
  --_animation-direction: forwards;
}

.scroller[data-speed="fast"] {
  --_animation-duration: 20s;
}

.scroller[data-speed="slow"] {
  --_animation-duration: 60s;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
}

/* general styles */

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


<!-- ////////////////////////////////////////////////////////////////////////////////// -->

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}



<!-- /////////////////////////////////////////////////////////////////////////// -->
how do i achieve this:
make it scroll and slowly slows down and eventually stops and wait for 2seconds and repeat scrolling and eventually stops slowly. NOTE: scolling is randomly done so the list can stop at any point:
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinit Scroller 🥂</title>
    <style>
        .scroller {
            max-width: 3000px;
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
            --_animation-duration: .5s;
        }

        .scroller[data-speed="slow"] {
            --_animation-duration: 60s;
        }

        @keyframes scroll {
            to {
                transform: translate(calc(-50% - 0.5rem));
            }
        }

        /* general styles */

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
    </style>
</head>

<body>
    <h1 style="text-align: center">Infinite Scroll Animation</h1>

    <div class="scroller" data-speed="fast" data-direction="right">
        <ul class="tag-list scroller__inner" style="background: white;">
            <li>HTML</li>
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
        const scrollers = document.querySelectorAll(".scroller");

        // If a user hasn't opted in for recuded motion, then we add the animation
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                // add data-animated="true" to every `.scroller` on the page
                scroller.setAttribute("data-animated", true);

                // Make an array from the elements within `.scroller-inner`
                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                // For each item in the array, clone it
                // add aria-hidden to it
                // add it into the `.scroller-inner`
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }

    </script>
</body>

</html>

<!-- dynamic css -->
**// Get the <style> element or create one if it doesn't exist
let styleElement = document.querySelector("#dynamic-css");
if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "dynamic-css";
    document.head.appendChild(styleElement);
}

// Create a CSS rule dynamically
const cssRule = `.scroller[data-speed="fast"] {
    --_animation-duration: ${yourDynamicValue}s;
}`;

// Insert the CSS rule into the <style> element
styleElement.sheet.insertRule(cssRule, styleElement.sheet.cssRules.length);**


        /*function handleSpeed(e) {
            const scrollerFast = document.querySelector('.scroller[data-speed="fast"]');
            const scrollerInner = scrollerFast.querySelector('.scroller__inner');

            if (e.target.classList.contains("increaseSpeed")) {
                newDuration *= 0.5;
                if (newDuration < 0.05) newDuration = 0.05;
            } else if (e.target.classList.contains("decreaseSpeed")) {
                newDuration /= 0.5;
                if (newDuration > (0.5 * 500)) newDuration = (0.5 * 500);
            }

            scrollerInner.style.animationDuration = `${newDuration}s`;
            if (newDuration >= 100 * 1000) {
                scrollerFast.classList.add('stopped');
                console.log("stop animation");
            } else if (newDuration < 100 * 1000) {
                scrollerFast.classList.remove('stopped');
                console.log("start animation");
            }
            console.log(newDuration, "got");
            /*if (newDuration >= 100) { scrollerFast.classList.add('stopped'); console.log("stop animation") }
            else if (newDuration < 100) { scrollerFast.classList.remove('stopped'); console.log("start animation") }
        } */


        <!-- intersection observer flavours -->
        <!-- html -->
        <div class="entry"></div>
<div class="items">
  <div>item</div>
  <div>item</div>
  <div>item</div>
  <div>item</div>
  <div>item</div>
  <div>item</div> 
  <div>item</div>
  <div>item</div>
  <div id="sentinel"></div>
  <div>item</div>
  <div>item</div>
</div>

<!-- css -->
body {
  font-family: sans-serif;
}

.items {
  margin-top: 40px;
}

.items div {
  height: 80px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #eee;
}

#sentinel {
  background-color: red;
  height: 1px;
  padding: 0;
  margin: 0;
}

.entry {
  background: #eee;
  position: sticky;
  top: 0;
  left: 20px;
  right: 20px;
  padding: 10px;
  font-size: 20px;
}

<!-- js -->
function displayEntry(entry) {
  let entryText =   document.querySelector(".entry");
  entryText.textContent  = `Intersecting: ${entry.isIntersecting}`;
}

let callback = function (entries, observer) {
  entries.forEach(entry => {
    displayEntry(entry);
  });
};

let observer = new IntersectionObserver(callback);

let target = document.querySelector("#sentinel");

observer.observe(target);

<!-- html 2 -->
<section>
  <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80" data-color="#f1bace" />
  <img src="https://images.unsplash.com/photo-1516085216930-c93a002a8b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" data-color="#ffbc00" />
  <img src="https://images.unsplash.com/photo-1458819714733-e5ab3d536722?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" data-color="#cfdfde" />
  <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2287&q=80" data-color="#3c94c5" />
  <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2247&q=80" data-color="#99aba0" />
  <img src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80" data-color="#b0e6db" />
  <img src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" data-color="#fe6f62" />
  <img src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80" data-color="#eed2b7" />
  <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2309&q=80" data-color="#f8bbc6" />
  <img src="https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" data-color="#08bac3" />
  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2189&q=80" data-color="#dcdcdc" />
</section>

<!-- css 2 -->
body {
  overscroll-behavior-x: none;
  scroll-behavior: smooth;
  display: flex;
  height: 100vh;
  align-items: center;
  overflow: hidden;
  justify-content: center;
}

section {
  width: 100%;
  box-sizing: border-box;
  transition: 0.3s;
  background-color: #f1bace;
  white-space: nowrap;
  position: relative;
  height: 100%;
  overflow: auto;
}

img {
  transition: 0.3s;
  width: 50%;
  margin-right: 10vw;
  height: 50vh;
  margin-top: 25vh;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4);
  opacity: 0;
}

.animate {
  opacity: 1;
}

img:first-child {
  margin-left: 10vw;
}

<!-- js 2 -->
const section = document.querySelector("section");
const images = document.querySelectorAll("img");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        section.style.backgroundColor = entry.target.getAttribute("data-color");
      }
    });
  },
  {
    threshold: 0.5
  }
);

images.forEach((el, i) => {
  observer.observe(el);
});


<!-- html 3 -->
<div id="observer-root">
    <div class="observable">Observed Element 1</div>
    <div class="observable">Observed Element 2</div>
    <div class="observable">Observed Element 3</div>
    <div class="observable">Observed Element 4</div>
    <div class="observable">Observed Element 5</div> 
    <div class="observable">Observed Element 6</div>    
</div>

<!-- css 3 -->
#observer-root {
  height: 256px;
  overflow: scroll;
}

.observable {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 32px;
  transition: background-color 0.5s ease;
}

.observable.in-sight {
  background-color: rgba(0,0,0,0.15);
}

<!-- js 3 -->
const callback = (entries) => {
  entries.forEach(({ target, isIntersecting } )=> {
    console.log(target);
    if (!isIntersecting) {
      return target.classList.remove('in-sight');
    }
    
    target.classList.add('in-sight');
  })
};

const observer = new IntersectionObserver(callback, {
  root: document.querySelector("#observer-root"),
  threshold: 1.0
});

document.querySelectorAll(".observable").forEach(el => observer.observe(el));


<!-- html 4 -->
<div id="box">
  <div class="vertical">
    Welcome to <strong>The Box!</strong>
  </div>
</div>

<!-- css 4 -->
#box {
  background-color: rgba(40, 40, 190, 255);
  border: 4px solid rgb(20, 20, 120);
  transition: background-color 1s, border 1s;
  width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.vertical {
  color: white;
  font: 32px "Arial";
}

.extra {
  width: 350px;
  height: 350px;
  margin-top: 10px;
  border: 4px solid rgb(20, 20, 120);
  text-align: center;
  padding: 20px;
}

<!-- js 4 -->
const numSteps = 20.0;

let boxElement;
let prevRatio = 0.0;
let increasingColor = "rgba(40, 40, 190, ratio)";
let decreasingColor = "rgba(190, 40, 40, ratio)";

// Set things up
window.addEventListener("load", (event) => {
  boxElement = document.querySelector("#box");

  createObserver();
}, false);

function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    prevRatio = entry.intersectionRatio;
  });
}

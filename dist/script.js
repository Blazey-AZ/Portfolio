// ========================================
// HERO TEXT SCROLL ANIMATION
// ========================================

// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    let animationTriggered = false;

    // Function to split text into individual letters
    function splitTextIntoLetters(element) {
        const text = element.getAttribute('data-text') || element.textContent;
        const letters = text.split('').map(char => {
            if (char === ' ') {
                return '<span class="letter space">&nbsp;</span>';
            }
            return `<span class="letter">${char}</span>`;
        });
        element.innerHTML = letters.join('');
        return element.querySelectorAll('.letter:not(.space)');
    }

    // Split all text elements into letters
    const subtitle = document.querySelector('.hero-subtitle');
    const line1 = document.querySelector('.hero-line1');
    const line2 = document.querySelector('.hero-line2');

    const subtitleLetters = splitTextIntoLetters(subtitle);
    const line1Letters = splitTextIntoLetters(line1);
    const line2Letters = splitTextIntoLetters(line2);

    // Combine all letters
    const allLetters = [...subtitleLetters, ...line1Letters, ...line2Letters];

    // Get code symbol elements
    const codeSymbol = document.getElementById('codeSymbol');
    const leftBracket = document.querySelector('.left-bracket');
    const slash = document.querySelector('.code-slash');
    const rightBracket = document.querySelector('.right-bracket');

    // Create the animation timeline
    // We remove 'paused: true' because ScrollTrigger will control it
    const heroTimeline = gsap.timeline({
        defaults: { ease: "power1.inOut" }
    });

    // Animation sequence
    heroTimeline
        // Step 1: Scatter letters outward
        .to(allLetters, {
            duration: 1,
            x: () => gsap.utils.random(-200, 200), // Reduced range for cleaner look
            y: () => gsap.utils.random(-150, 150),
            rotation: () => gsap.utils.random(-90, 90),
            opacity: 0, // Fade out while scattering
            scale: () => gsap.utils.random(0.5, 1.2),
            stagger: {
                amount: 0.2,
                from: "random"
            }
        })
        // Step 2: Show code symbol container and fade it in
        // CRITICAL FIX: Animate opacity of the parent container to 1
        .to(codeSymbol, {
            duration: 0.1,
            visibility: "visible",
            opacity: 1
        }, "-=0.5") // Overlap with scattering
        // Step 3: Animate code symbol parts into view
        .fromTo(leftBracket,
            {
                x: -100,
                opacity: 0,
                scale: 0.5
            },
            {
                duration: 0.5,
                x: 0,
                opacity: 1,
                scale: 1,
                ease: "back.out(1.7)"
            }
        )
        .fromTo(slash,
            {
                y: 100,
                opacity: 0,
                rotation: 45
            },
            {
                duration: 0.5,
                y: 0,
                opacity: 1,
                rotation: 0,
                ease: "back.out(1.7)"
            },
            "<" // Run at same time as previous
        )
        .fromTo(rightBracket,
            {
                x: 100,
                opacity: 0,
                scale: 0.5
            },
            {
                duration: 0.5,
                x: 0,
                opacity: 1,
                scale: 1,
                ease: "back.out(1.7)"
            },
            "<" // Run at same time
        );

    // Create ScrollTrigger bound to the timeline
    ScrollTrigger.create({
        animation: heroTimeline,
        trigger: "#header",
        start: "top top",      // Start when header top is at viewport top
        end: "70% center",     // End when header 70% point hits center viewport
        scrub: 1,              // Smooth scrubbing (1s delay) to follow scroll
        // This automatically handles playing forward on scroll down 
        // and reversing on scroll up
    });
});

// ========================================
// EXISTING CODE BELOW
// ========================================

var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-links");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-links");
    document.getElementById(tabname).classList.add("active-tab");
}

// Slider
let items = document.querySelectorAll('.slider1 .item1');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3;
function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();
next.onclick = function () {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}

// Sidemenu
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
    sidemenu.classList.add("menu-open");
}
function closemenu() {
    sidemenu.classList.remove("menu-open");
    setTimeout(() => {
        sidemenu.style.right = "-250px";
    }, 100);
}

// Auto-close menu when clicking on navigation links (mobile)
document.querySelectorAll('#sidemenu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            closemenu();
        }
    });
});
//Form Submitting
const scriptURL = 'https://script.google.com/macros/s/AKfycbwiclfm0M2kTNEovcPZXrHO0B8WcY--TC2YN6ba8LgqpF9yZTwtLhIobjJaJpVbsQVdtA/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
const dateInput = document.getElementById("currentDate");

const setCurrentDate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { timeZone: 'IST' }); // Format as MM/DD/YYYY, HH:MM:SS AM/PM
    dateInput.value = formattedDate;
};

form.addEventListener('submit', e => {
    e.preventDefault();
    setCurrentDate();
    msg.innerHTML = "Submitting...";
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 2000);
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
        });
});

// Scroll To Top
const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
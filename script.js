function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco();



// Navigation elements
const nav = document.querySelector("nav");
const menuTop = document.querySelector(".menu-top");
const menuIcon = document.querySelector(".nav-right i");

let flag = 0;

// Toggle menu function
const toggleMenu = () => {
    if (flag === 0) {
        menuTop.style.transform = `translateY(0%)`;
        nav.style.color = "#232025";
        flag = 1;
    } else {
        menuTop.style.transform = `translateY(-100%)`;
        nav.style.color = "#d1d1d1";
        flag = 0;
    }
};

// Event listener for menu icon click
menuIcon.addEventListener("click", toggleMenu);

// GSAP timeline animation
const t1 = gsap.timeline();
t1.from(".page1 h1", { y: 60, duration: 0.6, opacity: 0 })
    .from(".page1 h2", { y: 50, duration: 0.5, opacity: 0, delay: "-0.2" })
    .from(".page1 p", { y: 50, duration: 0.5, opacity: 0, delay: "-0.2" });

// GSAP animation for page1 img
gsap.to(".page1 img", {
    scale: 1.1,
    scrollTrigger: {
        trigger: ".page1 img",
        scroller : ".main",
        start: "top 80%",
        end: "top 10%",
        scrub: 3,
    },
});

// GSAP animation for page2 part1 h1
gsap.to('.page2 .part1 h1', {
    duration: 1,
    opacity: 1,
    rotateX: 0,
    scrollTrigger: {
        trigger: '.page2 .part1 h1',
        scroller : ".main",
        scrub: 2,
        start: 'top 90%',
        end: 'top 45%',
    }
});

// Function to animate slide elements
const animateSlideElement = (elements, translateXValue) => {
    elements.forEach(element => {
        gsap.to(element, {
            transform: `translateX(${translateXValue})`,
            duration: 4,
            scrollTrigger: {
                trigger: ".page6",
                scroller : ".main",
                scrub: 3,
            },
        });
    });
};


// Animate slideOne and slideTwo elements
const slideOne = document.querySelectorAll(".slideOne h1");
animateSlideElement(slideOne, "-100%");

const slideTwo = document.querySelectorAll(".slideTwo h1");
animateSlideElement(slideTwo, "0%");


const img1 = document.querySelector("#option1 img");
const img2 = document.querySelector("#option2 img");

const img1area = document.querySelector("#option1");
const img2area = document.querySelector("#option2");

img1area.addEventListener("mousemove", (event) => {
    const offsetX = event.clientX - 170;
    const offsetY = event.clientY - 150;

    img1.style.top = offsetY + "px";
    img1.style.left = offsetX + "px";
    img1.style.opacity = "1";
});

img2area.addEventListener("mousemove", (event) => {
    const offsetX = event.clientX - 855;
    const offsetY = event.clientY - 150;

    img2.style.top = offsetY + "px";
    img2.style.left = offsetX + "px";
    img2.style.opacity = "1";
});

function resetImagePosition(img) {
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.opacity = "0";
}

img1area.addEventListener("mouseleave", () => {
    resetImagePosition(img1);
});

img2area.addEventListener("mouseleave", () => {
    resetImagePosition(img2);
});

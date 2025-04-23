// < !--Testimmonila Carousel Code-- >
const testimonials = [
    {
        quote:
            "I recently got my logo, letter head and visiting cards designed by Clickaura Studio, and I must say the quality and creativity far exceeded my expectations. Their team’s attention to detail, prompt service, and professional approach truly impressed me. Their ability to translate ideas into impactful designs reflects their deep understanding of branding. I highly recommend Clickaura Studio to anyone seeking effective and elegant branding solutions.",
        designation: "BA LLB, LLM (IPR) Supreme Court of India",
        name: "Adv. Nikhil Kr Sharma",
        src:
            "images_and_ideo/advocate.jpeg"
    },
    {
        quote:
            "Getting my website designed and managed by Clickaura Studio has been one of the best decisions for my professional journey. Their team delivered a sleek, user-friendly site and continues to maintain it with top-notch support. Truly reliable and efficient — highly recommended!",
        name: "Rohit Sharma",
        designation: "Inventory Management Executive, Canada",
        src:
            "images_and_ideo/executive.jpeg"
    },
    {
        quote:
            "Clickaura Studio has completely transformed the way my brand appears online. From managing my Instagram and Facebook to optimizing my Justdial presence, their team has boosted my visibility and brought in more client inquiries than ever before. Creative minds with a strategic approach — truly impressive!",
        name: "Sahil Jolly",
        designation: "Founder, Jolly Balloon Decoration",
        src: "images_and_ideo/jolly.jpeg"
    }
];

let activeIndex = 0;
const imageContainer = document.getElementById("image-container");
const nameElement = document.getElementById("name");
const designationElement = document.getElementById("designation");
const quoteElement = document.getElementById("quote");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;

    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));

    return (
        minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
    );
}

function updateTestimonial(direction) {
    const oldIndex = activeIndex;
    activeIndex =
        (activeIndex + direction + testimonials.length) % testimonials.length;

    const containerWidth = imageContainer.offsetWidth;
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;

    testimonials.forEach((testimonial, index) => {
        let img = imageContainer.querySelector(`[data-index="${index}"]`);
        if (!img) {
            img = document.createElement("img");
            img.src = testimonial.src;
            img.alt = testimonial.name;
            img.classList.add("testimonial-image");
            img.dataset.index = index;
            imageContainer.appendChild(img);
        }

        const offset =
            (index - activeIndex + testimonials.length) % testimonials.length;
        const zIndex = testimonials.length - Math.abs(offset);
        const opacity = index === activeIndex ? 1 : 1;
        const scale = index === activeIndex ? 1 : 0.85;

        let translateX, translateY, rotateY;
        if (offset === 0) {
            translateX = "0%";
            translateY = "0%";
            rotateY = "0deg";
        } else if (offset === 1 || offset === -2) {
            translateX = "20%";
            translateY = `-${(maxStickUp / img.offsetHeight) * 100}%`;
            rotateY = "-15deg";
        } else {
            translateX = "-20%";
            translateY = `-${(maxStickUp / img.offsetHeight) * 100}%`;
            rotateY = "15deg";
        }

        img.style.zIndex = zIndex;
        img.style.opacity = opacity;
        img.style.transform = `translate(${translateX}, ${translateY}) scale(${scale}) rotateY(${rotateY})`;
    });

    nameElement.textContent = testimonials[activeIndex].name;
    designationElement.textContent = testimonials[activeIndex].designation;
    quoteElement.innerHTML = testimonials[activeIndex].quote
        .split(" ")
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");

    animateWords();
}

function animateWords() {
    const words = quoteElement.querySelectorAll(".word");
    words.forEach((word, index) => {
        word.style.opacity = "0";
        word.style.transform = "translateY(10px)";
        word.style.filter = "blur(10px)";
        setTimeout(() => {
            word.style.transition =
                "opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out";
            word.style.opacity = "1";
            word.style.transform = "translateY(0)";
            word.style.filter = "blur(0)";
        }, index * 20);
    });
}

function handleNext() {
    updateTestimonial(1);
}

function handlePrev() {
    updateTestimonial(-1);
}

prevButton.addEventListener("click", handlePrev);
nextButton.addEventListener("click", handleNext);

updateTestimonial(0);

const autoplayInterval = setInterval(handleNext, 5000);

[prevButton, nextButton].forEach((button) => {
    button.addEventListener("click", () => {
        clearInterval(autoplayInterval);
    });
});

window.addEventListener("resize", () => updateTestimonial(0));


// < !--Horizontal Slider-- >
gsap.registerPlugin(ScrollTrigger);
const slides = document.querySelectorAll(".slide");
gsap.to(".slider", {
    xPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top top",
        end: () => "+=" + document.querySelector(".slider").offsetWidth,
        pin: true,
        scrub: 1,
        markers: false // true for debugging
    }
});


// < !--Hamburger code-- >
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// contact form js 
const contactBtn = document.getElementById('contactBtn');
const modal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('contactForm');
const mobileInput = document.getElementById('mobile');

// Open modal
contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 🔐 Real-time mobile: Only numbers allowed
mobileInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

mobileInput.addEventListener('keydown', function (e) {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumber = /^[0-9]$/.test(e.key);
    if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
});

// ✅ Submit validation
form.addEventListener('submit', function (e) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !lastName || !mobile || !message) {
        alert("Please fill out all required fields.");
        e.preventDefault();
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        e.preventDefault();
        return;
    }

    // Optional: You can show success feedback
    alert("Form submitted successfully!");
});




// Cursor Animation JS
// document.body.addEventListener("mousemove", function (n) {
//     t.style.left = n.clientX + "px";
//     t.style.top = n.clientY + "px";
//     e.style.left = n.clientX + "px";
//     e.style.top = n.clientY + "px";
//     i.style.left = n.clientX + "px";
//     i.style.top = n.clientY + "px";
// });

// var t = document.getElementById("cursor"),
//     e = document.getElementById("cursor2"),
//     i = document.getElementById("cursor3");

// function n() {
//     e.classList.add("hover");
//     i.classList.add("hover");
// }
// function s() {
//     e.classList.remove("hover");
//     i.classList.remove("hover");
// }

// s();
// for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
//     o(r[a]);
// }
// function o(t) {
//     t.addEventListener("mouseover", n);
//     t.addEventListener("mouseout", s);
// }
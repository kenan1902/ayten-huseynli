"use strict";

// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});

// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]"),
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navLinks, "click", closeNav);

// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", activeElementOnScroll);

/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {
      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;
    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;

    setLetterEffect();
  }, totalLetterBoxDelay * 1000 + 3000);
};

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);

/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", scrollReveal);

scrollReveal();

/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () {
  cursor.classList.add("hovered");
};

// remove cursor hovered class
const hoverDeactive = function () {
  cursor.classList.remove("hovered");
};

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});

// Modal functionality
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const images = document.querySelectorAll(".photo-gallery-item");
let currentImageIndex;

// Hide modal by default
modal.classList.remove("active");

// Open modal when an image is clicked
images.forEach((img, index) => {
  img.addEventListener("click", function () {
    modal.classList.add("active");
    modalImg.src = this.src;
    currentImageIndex = index; // Keep track of the current image index
  });
});

// Close modal
closeBtn.onclick = function () {
  modal.classList.remove("active");
};

// Navigate to the next image
document.querySelector(".next").onclick = function () {
  currentImageIndex = (currentImageIndex + 1) % images.length; // Loop back to the first image
  modalImg.src = images[currentImageIndex].src;
};

// Navigate to the previous image
document.querySelector(".prev").onclick = function () {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // Loop back to the last image
  modalImg.src = images[currentImageIndex].src;
};

// EmailJS
function SendMail() {
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Validate Full Name (only letters)
  var nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(fullName)) {
    Toastify({
      text: "Full Name must contain only letters.",
      backgroundColor: "#ff5f6d",
      duration: 3000,
      gravity: "top",
      position: "center",
      className: "toast-error",
    }).showToast();
    return;
  }

  // Validate Email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Toastify({
      text: "Please enter a valid email address.",
      backgroundColor: "#ff5f6d",
      duration: 3000,
      gravity: "top",
      position: "center",
      className: "toast-error",
    }).showToast();
    return;
  }

  // If validation passes, proceed with sending the email
  var params = {
    from_name: fullName,
    email: email,
    message: message,
  };

  emailjs
    .send("service_93b62l6", "template_x4djlxs", params)
    .then(function (res) {
      Toastify({
        text: "Your message has been sent.",
        backgroundColor: "#00b09b",
        duration: 3000,
        gravity: "top",
        position: "center",
        className: "toast-success",
      }).showToast();
      document.getElementById("fullName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch(function (err) {
      Toastify({
        text: "Your message could not be sent.",
        backgroundColor: "#ff5f6d",
        duration: 3000,
        gravity: "top",
        position: "center",
        className: "toast-error",
      }).showToast();
    });
}

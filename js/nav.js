let mobileMenu = "closed";

document.addEventListener("DOMContentLoaded", function(event) {
  navMenu();
  fadeMenu();
  setAOS();
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "/index.html#showreel";
    sessionStorage.removeItem("indexScroll");
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#logotext .holder").addEventListener("click", () => {
    window.location = "/index.html#showreel";
    sessionStorage.removeItem("indexScroll");
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("nav ul").addEventListener("click", () => {
    sessionStorage.removeItem("indexScroll");
  });

  document.querySelector(".year").innerHTML = new Date().getFullYear();
});

function navMenu() {
  document.querySelector(".burger").addEventListener("click", openMenu);
  document.querySelector("nav ul").addEventListener("click", closeMenu);
}

function openMenu() {
  document.querySelector(".burger").classList.add("change");
  document.querySelector("nav").classList.add("show");
  const allToBlur = document.querySelectorAll("div:not(.noblur)");
  allToBlur.forEach(el => {
    el.classList.add("blur");
  });
  document.querySelector("html").classList.add("fixed");
  document.querySelector(".burger").removeEventListener("click", openMenu);
  document.querySelector(".burger").addEventListener("click", closeMenu);
  mobileMenu = "open";
}

function closeMenu() {
  document.querySelector(".burger").removeEventListener("click", closeMenu);
  document.querySelector(".burger").addEventListener("click", openMenu);
  document.querySelector(".burger").classList.remove("change");
  document.querySelector("nav").classList.remove("show");
  const allToBlur = document.querySelectorAll("div:not(.noblur)");
  allToBlur.forEach(el => {
    el.classList.remove("blur");
  });
  document.querySelector("html").classList.remove("fixed");
  mobileMenu = "closed";
  fadeMenu();
}

function fadeMenu() {
  window.addEventListener("scroll", scrolled);

  function scrolled() {
    window.removeEventListener("scroll", scrolled);
    if (mobileMenu !== "open") {
      document.querySelector("#gradiant").classList.remove("show_gradiant");
      document.querySelector("header").classList.add("hide_scroll_nav");
      document.querySelector("#gradiant").classList.add("hide_gradiant");
      setTimeout(function() {
        document.querySelector("#gradiant").classList.remove("hide_gradiant");
        document.querySelector("header").classList.remove("hide_scroll_nav");
        document.querySelector("#gradiant").classList.add("show_gradiant");
        fadeMenu();
      }, 1250);
    }
  }
}

function setAOS() {
  setTimeout(function() {
    let script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    document.body.appendChild(script);
    script.onload = function() {
      AOS.init();
    };
  }, 2000);
}

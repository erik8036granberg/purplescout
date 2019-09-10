let mobileMenu = "closed";

if (window.innerWidth < 900) {
  document.addEventListener("DOMContentLoaded", function(event) {
    navMenu();
    fadeMenu();
  });

  function navMenu() {
    document.querySelector(".burger").addEventListener("click", openMenu);
    document.querySelector("nav ul").addEventListener("click", closeMenu);
  }

  function openMenu() {
    document.querySelector(".burger").classList.add("change");
    document.querySelector("nav").classList.add("show");
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
}

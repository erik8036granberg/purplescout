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
    document.querySelector("header").classList.add("show");
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
    document.querySelector("header").classList.remove("show");
    document.querySelector("html").classList.remove("fixed");
    mobileMenu = "closed";
    fadeMenu();
  }

  function fadeMenu() {
    window.addEventListener("scroll", scrolled);

    function scrolled() {
      window.removeEventListener("scroll", scrolled);
      if (mobileMenu !== "open") {
        document.querySelector("header").classList.add("hide_scroll_nav");
        setTimeout(function() {
          document.querySelector("header").classList.remove("hide_scroll_nav");
          fadeMenu();
        }, 1250);
      }
    }
  }
}

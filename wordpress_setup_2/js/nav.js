let mobileMenu = "closed";

const pageHeader = `
<div id="logo"></div>
      <div class="burger">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <nav>
        <ul>
          <li><a href="/index.html#showreel">Home</a></li>
          <li><a href="/index.html#cases">Cases</a></li>
          <li><a href="/index.html#what">What</a></li>
          <li><a href="/index.html#how">How</a></li>
          <li><a href="/index.html#contact">Contact</a></li>
        </ul>
      </nav>
      <div id="logotext">
        <div class="holder"></div>
      </div>
      <div id="gradiant">
        <div class="top"></div>
        <div class="fade"></div>
      </div>
`;

const pageFooter = `
<h1>Contact</h1>
<div class="content">
  <div class="address">
    <h2>Purple Scout</h2>
    <p>Njalsgade 21G, 3rd fl.</p>
    <p>2300 København S</p>
    <p>Denmark</p>
  </div>
  <div class="contact">
    <a href="tel:+45 2674 4609" class="icon phone">+45 2674 4609</a>
    <a href="mailto:niels.ostergaard@purplescout.dk" class="icon mail"
      >niels.ostergaard@purplescout.dk</a
    >
  </div>
  <div class="some"></div>
  <div class="copyright">
    Copyright <span class="year"></span> © Purple Scout ApS
  </div>
</div>`;

const pageSome = `
<a
      href="https://da-dk.facebook.com/purplescout"
      target="_blank"
      class="some_icon"
      ><i class="fab fa-facebook-square"></i
    ></a>
    <a
      href="http://www.instagram.com/purple_scout_ab"
      target="_blank"
      class="some_icon"
      ><i class="fab fa-instagram"></i
    ></a>
    <a
      href="https://twitter.com/purplescout"
      target="_blank"
      class="some_icon"
      ><i class="fab fa-twitter-square"></i
    ></a>
    <a
      href="https://www.linkedin.com/company/purple-scout-ab"
      target="_blank"
      class="some_icon"
      ><i class="fab fa-linkedin"></i
    ></a>
`;

document.addEventListener("DOMContentLoaded", function(event) {
  // response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  // response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  // response.setHeader("Expires", "0"); // Proxies.
  document.querySelector("header").innerHTML = pageHeader;
  document.querySelector("footer").innerHTML = pageFooter;
  document.querySelector("footer .some").innerHTML = pageSome;
  navMenu();
  fadeMenu();
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "/index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#logotext .holder").addEventListener("click", () => {
    window.location = "/index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
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

// force lastest version

document
  .querySelector("[data-css_version]")
  .setAttribute(
    "href",
    "css/style.css" + "?version=" + Math.floor(Math.random() * 100000)
  );

document
  .querySelector("[data-nav_version]")
  .setAttribute(
    "href",
    "/js/nav.js" + "?version=" + Math.floor(Math.random() * 100000)
  );

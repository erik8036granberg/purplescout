let mobileMenu = "closed";

document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector("header").innerHTML = pageHeader;
  document.querySelector("footer").innerHTML = pageFooter;
  document.querySelector("footer .some").innerHTML = pageSome;
  navMenu();
  fadeMenu();
  setAOS();
  // scrollToAnchor();
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
  let indexScrollTop;

  function scrolled() {
    window.removeEventListener("scroll", scrolled);
    indexScrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log(indexScrollTop);
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
      <div class="contact_wrapper" data-aos="fade-up"
      data-aos-duration="500">
        <div class="contact">
          <h2>Purple Scout Copenhagen</h2>
          <a href="tel:+45 2674 4609" class="icon phone" data-cph_phone>+45 2674 4609</a>
          <a href="mailto:contact@purplescout.dk" class="icon mail" data-chp_mail
            >contact@purplescout.dk</a
          >
        </div>
        <div class="links">
          <h2>Purple Scout corporate website</h2>
          <a href="https://www.purplescout.se/" class="icon link" data-website_se
            >www.purplescout.se</a
          >
          <a href="https://www.purplescout.dk/" class="icon link" data-website_dk
            >www.purplescout.dk</a
          >
          <div class="some"></div>
        </div>
      </div>
      <div class="about" data-aos="fade-up"
      data-aos-duration="500">
        <h2>About</h2>
        <div data-about_text>
        <p>
          Purple Scout is a consulting company specialized in programming and
          problem-solving. We are based in Sweden and Denmark.
        </p>
        <p>
          We’re extraordinarily good at understanding what our customers truly
          need. Purple Scout’s superpower is our flexibility. As a customer, you
          can rest assured that our industry-leading consultants always will
          create the perfect solution for your projects.
        </p>
        </div>
      </div>
      <div class="location_wrapper" data-aos="fade-up"
      data-aos-duration="500">
        <img src="../img/location_map.svg" alt="map" class="localtion_map" data-footer_location_map />
        <div class="address_wrapper">
          <div class="address">
            <h3 data-contact_header_copenhagen>Copenhangen</h3>
            <div data-contact_address_copenhagen>
            Njalsgade 21G, 3rd fl.<br />
            2300 København S<br />
            Denmark
            </div>
          </div>
          <div class="address">
            <h3 data-contact_header_malmo>Malmö</h3>
            <div data-contact_address_malmo>
            Stortorget 29<br />
            211 34 Malmö<br />
            Sweden
            </div>
          </div>
          <div class="address">
            <h3 data-contact_header_gothenburg>Gothenburg</h3>
            <div data-contact_address_gothenburg>
            Västra Hamngatan 10<br />
            411 17 Göteborg<br />
            Sweden
            </div>
          </div>
          <div class="address">
            <h3 data-contact_header_boras>Borås</h3>
            <div data-contact_address_boras>
            Västerlånggatan 30-32<br />
            03 30 Borås<br />
            Sweden
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        Copyright <span class="year"></span> © Purple Scout ApS
      </div>
    </div>`;

const pageSome = `
<a
      href="https://da-dk.facebook.com/purplescout"
      target="_blank"
      class="some_icon"
      data-some_facebook
      ><i class="fab fa-facebook-square"></i
    ></a>
    <a
      href="http://www.instagram.com/purple_scout_ab"
      target="_blank"
      class="some_icon"
      data-some_instagram
      ><i class="fab fa-instagram"></i
    ></a>
    <a
      href="https://twitter.com/purplescout"
      target="_blank"
      class="some_icon"
      data-some_twitter
      ><i class="fab fa-twitter-square"></i
    ></a>
    <a
      href="https://www.linkedin.com/company/purple-scout-ab"
      target="_blank"
      class="some_icon"
      data-some_linkedin
      ><i class="fab fa-linkedin"></i
    ></a>
`;

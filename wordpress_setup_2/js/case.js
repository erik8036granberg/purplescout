"use strict";

//	URL stuff
let urlParams = new URLSearchParams(window.location.search);
let urlCase = urlParams.get("id");
console.log("urlCase er: " + urlCase);

let showreelButton = false;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getPageContent();
  document.querySelector(".year").innerHTML = new Date().getFullYear();
  showreelCta();
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "case.html#case";
  });
}

function getPageContent() {
  console.log("getPageContent");
  fetch(
    `http://erik-crg.dk/purplescout/wordpress/wp-json/wp/v2/case?slug=${urlCase}`
  )
    .then(response => response.json())
    .then(myJson => {
      const pageContent = myJson;
      console.log("pageContent from URL-filter");
      console.log(pageContent);
    });
}

function showreelCta() {
  let inview;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        inview = true;
        setTimeout(() => {
          if (inview == true && showreelButton == false) {
            console.log("Seen for 5 sec for the first time");
            showreelButton = true;
            document.querySelector("#showreel .cta").classList.add("appear");
          }
        }, 5000);
      } else {
        inview = false;
      }
    });
  });
}

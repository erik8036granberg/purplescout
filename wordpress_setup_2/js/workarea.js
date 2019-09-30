"use strict";

//	URL stuff
let urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get("id");
console.log("urlID er: " + urlID);

// sessionStorrage pagelink
let urlWorkarea = sessionStorage.getItem("workAreaLink");
console.log(urlWorkarea);

let showreelButton = false;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getPageContent();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#case";
  });
}

function getPageContent() {
  console.log("getPageContent");
  fetch(`/wordpress/wp-json/wp/v2/workareas?slug=${urlWorkarea}`)
    .then(response => response.json())
    .then(myJson => {
      const pageContent = myJson[0];
      console.log("pageContent from URL-filter");
      console.log(pageContent);
      InsertPageContent(pageContent);
    });
}

function InsertPageContent(pageContent) {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    "Workarea - " + pageContent.acf.area_header;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - show reel image & header - - - - - - - - - - -

  dest.querySelector(
    "[data-showreel_image]"
  ).style.backgroundImage = `url(${pageContent.acf.showreel_image.url})`;

  dest.querySelector("[data-showreel_header]").textContent =
    pageContent.acf.area_header;
}

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
  latestVersion();
  getPageContent();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#workarea";
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

  // - - - - - - - - - - - Symbol & header - - - - - - - - - - -

  dest
    .querySelector("[data-area_symbol]")
    .setAttribute("src", pageContent.acf.area_symbol);
  dest.querySelector("[data-area_header]").textContent =
    pageContent.acf.area_header;

  // - - - - - - - - - - - main text - - - - - - - - - - -

  dest.querySelector("[data-area_main_text]").innerHTML =
    pageContent.acf.area_main_text;

  // - - - - - - - - - - - get related cases - - - - - - - - - - -

  // get cases
  fetch("/wordpress/wp-json/wp/v2/case?per_page=100")
    .then(response => response.json())
    .then(myJson => {
      let caseArray = myJson;
      caseArray.forEach(caseItem => {
        console.log(caseItem.acf.work_areas_symbols);
        console.log(caseItem.acf.work_areas_symbols.includes(pageContent.id));
        if (caseItem.acf.work_areas_symbols.includes(pageContent.id)) {
          showRelatedCases(caseItem);
        }
      });
    });
}

// - - - - - - - - - - - - - display related cases - - - - - - - - - - - - -

function showRelatedCases(caseItem) {
  console.log("showRelatedCases");
  console.log("Case match workarea-ID");
  console.log(caseItem);
  const template = document.querySelector("[data-related_template]").content;
  const clone = template.cloneNode(true);
  clone
    .querySelector("[data-case_thumbnail]")
    .setAttribute("src", caseItem.acf.case_thumbnail.sizes.medium);
  clone
    .querySelector("[data-case_thumbnail]")
    .setAttribute(
      "alt",
      caseItem.acf.solution + " for " + caseItem.acf.company
    );
  clone.querySelector("[data-company]").textContent = caseItem.acf.company;
  clone.querySelector("[data-thumb_description]").textContent =
    caseItem.acf.thumb_description;
  clone.querySelector("[data-solution]").textContent = caseItem.acf.solution;
  clone.querySelector("[data-related_link]").addEventListener("click", () => {
    window.location.href = "/case.html?id=" + caseItem.slug;
    window.sessionStorage.setItem("caseLink", caseItem.slug);
  });
  document.querySelector("[data-related_container]").appendChild(clone);
}

function latestVersion() {
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

  document
    .querySelector("[data-workarea_version]")
    .setAttribute(
      "href",
      "/js/workarea.js" + "?version=" + Math.floor(Math.random() * 100000)
    );
}

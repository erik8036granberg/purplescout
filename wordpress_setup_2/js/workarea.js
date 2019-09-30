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
  const template = document.querySelector("[data-related_template]").content;
  const clone = template.cloneNode(true);

  clone.querySelector("[data-related_case]").textContent = caseItem.acf.company;

  // clone.querySelector("[data-id]").setAttribute("id", caseItem.slug);
  // clone
  //   .querySelector("[data-video_still_image]")
  //   .setAttribute("src", caseItem.acf.video_still_image.sizes.medium_large);
  // clone
  //   .querySelector("[data-video_still_image]")
  //   .setAttribute("alt", caseItem.acf.company);
  // clone.querySelector("[data-company]").textContent = caseItem.acf.company;
  // clone.querySelector("[data-solution]").textContent = caseItem.acf.solution;
  // clone.querySelector("[data-id]").addEventListener("click", () => {
  //   window.location.href = "case.html?id=" + caseItem.slug;
  //   window.sessionStorage.setItem("caseLink", caseItem.slug);
  // });
  document.querySelector("[data-related_container]").appendChild(clone);
}

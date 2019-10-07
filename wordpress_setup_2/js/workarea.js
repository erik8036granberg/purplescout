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
  getPageContent();
  getCaseContent();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#workarea";
  });
}

async function getPageContent() {
  let pageContent = await fetchWP(`workareas?slug=${urlWorkarea}`);
  pageContent = pageContent[0];
  insertPageContent(pageContent);
  console.log(pageContent);
}

function insertPageContent(pageContent) {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    "Workarea - " + pageContent.acf.area_header;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - show reel image & header - - - - - - - - - - -

  if (window.innerWidth > 1200) {
    dest.querySelector(
      "[data-showreel_image]"
    ).style.backgroundImage = `url(${pageContent.acf.showreel_image.url})`;
  } else if (window.innerWidth > 900) {
    dest.querySelector(
      "[data-showreel_image]"
    ).style.backgroundImage = `url(${pageContent.acf.showreel_image.sizes.post -
      thumbnail})`;
  } else {
    dest.querySelector(
      "[data-showreel_image]"
    ).style.backgroundImage = `url(${pageContent.acf.showreel_image.sizes.medium_large})`;
  }
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

  getCaseContent(pageContent.id);
}

// - - - - - - - - - - - get related cases - - - - - - - - - - -

async function getCaseContent(pageContent_id) {
  let caseArray = await fetchWP("case?per_page=100");
  caseArray.forEach(caseItem => {
    if (caseItem.acf.work_areas_symbols.includes(pageContent_id)) {
      showRelatedCases(caseItem);
    }
  });
}

// - - - - - - - - - - - - - display related cases - - - - - - - - - - - - -

function showRelatedCases(caseItem) {
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
  clone.querySelector("[data-description_header]").textContent =
    caseItem.acf.description_header;
  clone.querySelector("[data-solution]").textContent = caseItem.acf.solution;
  clone.querySelector("[data-related_link]").addEventListener("click", () => {
    window.location.href = "/case.html?id=" + caseItem.slug;
    window.sessionStorage.setItem("caseLink", caseItem.slug);
  });
  document.querySelector("[data-related_container]").appendChild(clone);
}

function fetchWP(wpPath) {
  return new Promise(resolve => {
    fetch("/wordpress/wp-json/wp/v2/" + wpPath)
      .then(response => response.json())
      .then(myJson => {
        let wpContent = myJson;
        resolve(wpContent);
      });
  });
}

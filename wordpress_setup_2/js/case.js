"use strict";

//	URL stuff
let urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get("id");
console.log("urlID er: " + urlID);

// sessionStorrage pagelink
let urlCase = sessionStorage.getItem("caseLink");
console.log(urlCase);

let showreelButton = false;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getPageContent();
  showreelCta();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#case";
  });
}

function getPageContent() {
  console.log("getPageContent");
  fetch(`/wordpress/wp-json/wp/v2/case?slug=${urlCase}`)
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
    "Showcase - " + pageContent.acf.company;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - video - - - - - - - - - - -

  if (window.innerWidth > 1200) {
    console.log("Large video");
    dest
      .querySelector("[data-showreel_video]")
      .setAttribute("src", pageContent.acf.showreel_video_large);
  } else if (window.innerWidth > 500) {
    console.log("Medium video");
    dest
      .querySelector("[data-showreel_video]")
      .setAttribute("src", pageContent.acf.showreel_video_medium);
  } else {
    console.log("Small video");
    dest
      .querySelector("[data-showreel_video]")
      .setAttribute("src", pageContent.acf.showreel_video_small);
  }

  // - - - - - - - - - - - case header - - - - - - - - - - -

  dest.querySelector("[data-company]").textContent = pageContent.acf.company;
  dest.querySelector("[data-solution]").textContent = pageContent.acf.solution;

  // - - - - - - - - - - - main text - - - - - - - - - - -

  dest.querySelector("[data-main_text]").innerHTML = pageContent.acf.main_text;

  // - - - - - - - - - - - images - - - - - - - - - - -

  dest
    .querySelector("[data-image_1]")
    .setAttribute("src", pageContent.acf.image_1.sizes.medium_large);
  dest
    .querySelector("[data-image_1]")
    .setAttribute(
      "alt",
      pageContent.acf.solution + " for " + pageContent.acf.company
    );

  dest
    .querySelector("[data-image_2]")
    .setAttribute("src", pageContent.acf.image_2.sizes.medium_large);
  dest
    .querySelector("[data-image_2]")
    .setAttribute(
      "alt",
      pageContent.acf.solution + " for " + pageContent.acf.company
    );

  // - - - - - - - - - - - fact points - - - - - - - - - - -

  let factPoints = pageContent.acf.fact_points;
  console.log(factPoints);
  factPoints.forEach(getFactPoints);
  let factArray = [];
  console.log(factArray);
  function getFactPoints(factPoint_id) {
    fetch(`/wordpress/wp-json/wp/v2/facts/${factPoint_id}`)
      .then(response => response.json())
      .then(myJson => {
        let factPoint = myJson;
        factArray.push(factPoint);
        if (factArray.length === factPoints.length) {
          insertFact();
        }
      });
  }

  // - - - - - - - - - - - insert fact points - - - - - - - - - - -

  function insertFact() {
    console.log("insertFact");
    console.log(factArray);
    factArray.forEach(factItem => {
      const newFactPoint = document.createElement("DIV");
      newFactPoint.setAttribute("class", "point");
      document.querySelector("[data-fact_points]").appendChild(newFactPoint);
      if (factItem.acf.fact_symbol) {
        const newFactSymbol = document.createElement("IMG");
        newFactSymbol.setAttribute("src", factItem.acf.fact_symbol);
        newFactPoint.appendChild(newFactSymbol);
      } else if (factItem.acf.fact_procentage) {
        const newFactProcentage = document.createElement("DIV");
        newFactProcentage.textContent = factItem.acf.fact_procentage;
        newFactProcentage.setAttribute("class", "point_procentage");
        newFactPoint.appendChild(newFactProcentage);
      }
      const newFactText = document.createElement("DIV");
      newFactText.textContent = factItem.acf.fact_text;
      newFactText.setAttribute("class", "point_text");
      newFactPoint.appendChild(newFactText);
      document.querySelector("[data-fact_points]").appendChild(newFactPoint);
    });
  }

  // - - - - - - - - - - - testimonial - - - - - - - - - - -

  if (pageContent.acf.testimonial_quote === "") {
    dest.querySelector(".case_testimonial").style.display = "none";
  } else {
    if (pageContent.acf.testimonial_quote) {
      dest.querySelector("[data-testimonial_quote]").innerHTML =
        pageContent.acf.testimonial_quote;
    }
    if (pageContent.acf.testimonial_person) {
      dest.querySelector("[data-testimonial_person]").innerHTML =
        pageContent.acf.testimonial_person;
    }
    if (pageContent.acf.testimonial_company) {
      dest.querySelector("[data-testimonial_company]").innerHTML =
        pageContent.acf.testimonial_company;
    }
  }

  // - - - - - - - - - - - Tech text section - - - - - - - - - - -

  dest.querySelector("[data-tech_header]").textContent =
    pageContent.acf.tech_header;
  dest.querySelector("[data-tech_text]").innerHTML = pageContent.acf.tech_text;

  // - - - - - - - - - - - case contact - - - - - - - - - - -

  dest.querySelector("[data-case_contact_name]").textContent =
    pageContent.acf.case_contact_name;
  dest.querySelector("[data-case_contact_phone]").textContent =
    pageContent.acf.case_contact_phone;
  dest
    .querySelector("[data-case_contact_phone]")
    .setAttribute("href", "tel:" + pageContent.acf.case_contact_phone);

  // - - - - - - - - - - - Work area symbols - - - - - - - - - - -

  let workAreas = pageContent.acf.work_areas_symbols;
  workAreas.forEach(getWorkareas);
  let workAreaArray = [];

  function getWorkareas(workarea_id) {
    fetch(`/wordpress/wp-json/wp/v2/workareas/${workarea_id}`)
      .then(response => response.json())
      .then(myJson => {
        let workarea = myJson;
        workAreaArray.push(workarea);
        if (workAreaArray.length === workAreas.length) {
          insertWorkaraSymbols();
        }
      });
  }

  // - - - - - - - - - - - insert Work area symbols - - - - - - - - - - -

  function insertWorkaraSymbols() {
    workAreaArray.forEach(workareaItem => {
      const makeImg = document.createElement("IMG");
      makeImg.setAttribute("src", workareaItem.acf.area_symbol);
      makeImg.setAttribute("alt", workareaItem.acf.area_header);
      makeImg.addEventListener("click", () => {
        window.location.href = "/workarea.html?id=" + workareaItem.slug;
        window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
      });
      document.querySelector("[data-work_areas_symbols]").appendChild(makeImg);
    });
  }
}

// - - - - - - - - - - - Showreel CTA - - - - - - - - - - -

// TODO: modal code + correct CTA?

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

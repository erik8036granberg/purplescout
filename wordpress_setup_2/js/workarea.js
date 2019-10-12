"use strict";

//	URL stuff
let urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get("id");
console.log("urlID er: " + urlID);

// sessionStorrage pagelink
let urlWorkarea = sessionStorage.getItem("workAreaLink");
console.log(urlWorkarea);

window.addEventListener("DOMContentLoaded", init);

function init() {
  getPageContent();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#workarea";
  });
}

// - - - - - - - - - - - get page content  - - - - - - - - - - -
let pageContent;

async function getPageContent() {
  pageContent = await fetchWP(`workareas?slug=${urlWorkarea}`);
  pageContent = pageContent[0];
  insertPageContent();
  console.log(pageContent);
}

function insertPageContent() {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    pageContent.acf.seo_title;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - show reel image & header - - - - - - - - - - -

  if (window.innerWidth > 1200) {
    dest.querySelector(
      "[data-showreel_image]"
    ).style.backgroundImage = `url(${pageContent.acf.showreel_image.url})`;
  } else if (window.innerWidth > 900) {
    dest.querySelector("[data-showreel_image]").style.backgroundImage = `url(${
      pageContent.acf.showreel_image.sizes["post-thumbnail"]
    })`;
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
  getCtaContent();
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
      caseItem.acf.description_header + " for " + caseItem.acf.company
    );
  let trimLength;
  if (window.innerWidth > 1500) {
    trimLength = 50;
  } else if (window.innerWidth > 1200) {
    trimLength = 40;
  } else if (window.innerWidth > 500) {
    trimLength = 70;
  } else {
    trimLength = 30;
  }
  if (caseItem.acf.description_header.length > trimLength) {
    let trimmedDescription = caseItem.acf.description_header.substring(
      0,
      trimLength
    );
    trimmedDescription = trimmedDescription.substr(
      0,
      Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))
    );
    clone.querySelector("[data-description_header]").textContent =
      trimmedDescription + "...";
  } else {
    clone.querySelector("[data-description_header]").textContent =
      caseItem.acf.description_header;
  }
  if (caseItem.acf.company.includes(" - ")) {
    let justCompanyName = caseItem.acf.company.substring(
      0,
      caseItem.acf.company.indexOf(" - ")
    );
    clone.querySelector("[data-company]").textContent = justCompanyName;
  } else {
    clone.querySelector("[data-company]").textContent = caseItem.acf.company;
  }
  clone.querySelector("[data-related_link]").addEventListener("click", () => {
    window.location.href = "/case.html?id=" + caseItem.slug;
    window.sessionStorage.setItem("caseLink", caseItem.slug);
  });
  document.querySelector("[data-related_container]").appendChild(clone);
}

// - - - - - - - - - - - get cta content  - - - - - - - - - - -

let getCtaArray;
let checkCtaSliderSeen;

async function getCtaContent() {
  getCtaArray = await fetchWP("cta?per_page=100");
  console.log(getCtaArray);
  workareaCtaObserver();
}

// - - - - - - - - - - - - - CTA workarea observer - - - - - - - - - - - - -

function workareaCtaObserver() {
  console.log("workareaCta");
  let workareaInview;
  document
    .querySelector("#cta_slider .cta_slider_button")
    .addEventListener("click", () => {
      ctaClicked("workareaCta");
    });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        workareaInview = true;
        console.log("workarea in view");
        checkCtaSliderSeen = sessionStorage.getItem(pageContent.slug);
        setTimeout(() => {
          if (workareaInview == true && checkCtaSliderSeen != "true") {
            window.sessionStorage.setItem(`${pageContent.slug}`, "true");
            console.log("workarea CTA target seen");
            ctaSliderModal(pageContent.acf.workarea_cta);
          }
        }, 10000);
      } else {
        workareaInview = false;
      }
    });
  });

  observer.observe(document.querySelector("body"));
}

// - - - - - - - - - - - Cta SliderModal show / hide  - - - - - - - - - - -

function ctaSliderModal(cta_id) {
  let ctaFilter = getCtaArray.filter(function(ctaItem) {
    return ctaItem.id == cta_id;
  });
  let activeCta = ctaFilter[0];
  document.querySelector("[data-slider_ask]").textContent =
    activeCta.acf.cta_header;
  document.querySelector("#cta_slider").classList.add("show_cases_slider");
  document
    .querySelector("#cta_slider .close")
    .addEventListener("click", closeSlider);
}

function closeSlider() {
  console.log("closeSlider");
  document
    .querySelector("#cta_slider .close")
    .removeEventListener("click", closeSlider);
  document.querySelector("#cta_slider").classList.remove("show");
  document.querySelector("#cta_slider").classList.remove("show_cases_slider");
}

// - - - - - - - - - - - Cta button clicked  - - - - - - - - - - -

function ctaClicked(button_id) {
  let cta_id;
  if (button_id === "workareaCta") {
    closeSlider();
    cta_id = pageContent.acf.workarea_cta;
  }
  let ctaFilter = getCtaArray.filter(function(ctaItem) {
    return ctaItem.id == cta_id;
  });
  displayCta(ctaFilter[0]);
  CtaModal();
}

// - - - - - - - - - - - display Cta content   - - - - - - - - - - -

function displayCta(ctaItem) {
  console.log("displayCta");
  console.log(ctaItem);
  document.querySelector("[data-cta_container]").innerHTML = "";
  const template = document.querySelector("[data-cta_template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-cta_header]").textContent = ctaItem.acf.cta_header;
  clone.querySelector("[data-cta_text]").innerHTML = ctaItem.acf.cta_text;
  clone.querySelector("[data-cta_contact_person]").textContent =
    ctaItem.acf.cta_contact_person;
  clone.querySelector("[data-cta_phone]").textContent = ctaItem.acf.cta_phone;
  if (window.innerWidth < 400) {
    const mailLinebrak = ctaItem.acf.cta_mail.replace("@", "<br>@");
    clone.querySelector(
      "[data-cta_mail]"
    ).innerHTML = `<div>${mailLinebrak}</div>`;
  } else {
    clone.querySelector("[data-cta_mail]").textContent = ctaItem.acf.cta_mail;
  }
  clone
    .querySelector("[data-cta_mail]")
    .setAttribute("href", "mailto:" + ctaItem.acf.cta_mail);
  document.querySelector("[data-cta_container]").appendChild(clone);
  document.querySelector("#cta_modal .some").innerHTML = pageSome;
}

// - - - - - - - - - - - Cta modal show / hide  - - - - - - - - - - -

function CtaModal() {
  document.querySelector("#cta_modal").classList.add("show");
  document.querySelector("#cta_modal .modal_content").classList.add("show");
  if (
    pageContent.acf.showreel_video_large ||
    pageContent.acf.showreel_video_medium ||
    pageContent.acf.showreel_video_small
  ) {
    document.querySelector("#showreel #reel").pause();
  }
  document.querySelector("html").classList.add("fixed");
  document
    .querySelector("#cta_modal .close")
    .addEventListener("click", closeModal);
  function closeModal() {
    console.log("closeModal");
    if (
      pageContent.acf.showreel_video_large ||
      pageContent.acf.showreel_video_medium ||
      pageContent.acf.showreel_video_small
    ) {
      document.querySelector("#showreel #reel").play();
    }
    document
      .querySelector("#cta_modal .close")
      .removeEventListener("click", closeModal);
    document.querySelector("#cta_modal").classList.remove("show");
    document
      .querySelector("#cta_modal .modal_content")
      .classList.remove("show");
    document.querySelector("html").classList.remove("fixed");
  }
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

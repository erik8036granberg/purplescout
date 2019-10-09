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
  getCtaContent();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#case";
  });
}

// - - - - - - - - - - - get page content  - - - - - - - - - - -
let pageContent;

async function getPageContent() {
  console.log("getPageContent");
  pageContent = await fetchWP(`case?slug=${urlCase}`);
  pageContent = pageContent[0];
  insertPageContent();
  console.log();
}

function insertPageContent() {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    "Showcase - " + pageContent.acf.company;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - show reel image alternativ image or video sizes - - - - - - - - - - -

  if (pageContent.acf.showreel_image) {
    console.log("showreel image is present");

    document.querySelector("video").style.display = "none";

    if (window.innerWidth > 1200) {
      dest.querySelector(
        "[data-showreel_image]"
      ).style.backgroundImage = `url(${pageContent.acf.showreel_image.url})`;
    } else if (window.innerWidth > 900) {
      dest.querySelector(
        "[data-showreel_image]"
      ).style.backgroundImage = `url(${
        pageContent.acf.showreel_image.sizes["post-thumbnail"]
      })`;
    } else {
      dest.querySelector(
        "[data-showreel_image]"
      ).style.backgroundImage = `url(${pageContent.acf.showreel_image.sizes.medium_large})`;
    }
  } else {
    document.querySelector("#showreel_image").style.display = "none";
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
  }

  // - - - - - - - - - - - case header - - - - - - - - - - -

  dest.querySelector("[data-description_header]").textContent =
    pageContent.acf.description_header;
  dest.querySelector("[data-company]").textContent = pageContent.acf.company;

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
      pageContent.acf.description_header + " for " + pageContent.acf.company
    );

  if (pageContent.acf.image_1_border === "border") {
    dest.querySelector("[data-image_1]").classList.add("border");
  } else if (pageContent.acf.image_1_border === "no_border") {
    dest.querySelector("[data-image_1]").classList.add("noborder");
  }

  dest
    .querySelector("[data-image_2]")
    .setAttribute("src", pageContent.acf.image_2.sizes.medium_large);
  dest
    .querySelector("[data-image_2]")
    .setAttribute(
      "alt",
      pageContent.acf.description_header + " for " + pageContent.acf.company
    );

  if (pageContent.acf.image_2_border === "border") {
    dest.querySelector("[data-image_2]").classList.add("border");
  } else if (pageContent.acf.image_1_border === "no_border") {
    dest.querySelector("[data-image_2]").classList.add("noborder");
  }

  // - - - - - - - - - - - fact points - - - - - - - - - - -

  let factPoints = pageContent.acf.fact_points;
  console.log(factPoints);
  factPoints.forEach(getFactPoints);
  let factArray = [];
  console.log(factArray);
  async function getFactPoints(factPoint_id) {
    let factPoint = await fetchWP(`facts/${factPoint_id}`);
    factArray.push(factPoint);
    if (factArray.length === factPoints.length) {
      insertFact();
    }
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

  async function getWorkareas(workarea_id) {
    let workarea = await fetchWP(`workareas/${workarea_id}`);
    workAreaArray.push(workarea);
    if (workAreaArray.length === workAreas.length) {
      insertWorkaraSymbols();
    }
  }

  // - - - - - - - - - - - insert Work area symbols - - - - - - - - - - -

  function insertWorkaraSymbols() {
    console.log("insertWorkaraSymbols");
    workAreaArray.forEach(workareaItem => {
      const makeDiv = document.createElement("DIV");
      const makeImg = document.createElement("IMG");
      makeImg.setAttribute("src", workareaItem.acf.area_symbol);
      makeImg.setAttribute("alt", workareaItem.acf.area_header);
      makeDiv.appendChild(makeImg);
      const makeTextHolder = document.createElement("DIV");
      makeTextHolder.setAttribute("class", "center");
      makeDiv.appendChild(makeTextHolder);
      const makeText = document.createTextNode(workareaItem.acf.area_header);
      makeTextHolder.appendChild(makeText);
      makeDiv.setAttribute("class", "workarea_wrapper");
      makeDiv.addEventListener("click", () => {
        window.location.href = "/workarea.html?id=" + workareaItem.slug;
        window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
      });
      document.querySelector("[data-work_areas_symbols]").appendChild(makeDiv);
    });
  }
}

// - - - - - - - - - - - get cta content  - - - - - - - - - - -

let getCtaArray;
let checkCtaSliderSeen;

async function getCtaContent() {
  getCtaArray = await fetchWP("cta?per_page=100");
  caseCtaObserver();
}

// - - - - - - - - - - - - - CTA case observer - - - - - - - - - - - - -

function caseCtaObserver() {
  console.log("caseCta");
  let caseInview;
  document
    .querySelector("#cta_slider .cta_slider_button")
    .addEventListener("click", () => {
      ctaClicked("howCta");
    });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        caseInview = true;
        checkCtaSliderSeen = sessionStorage.getItem(pageContent.slug);
        setTimeout(() => {
          if (caseInview == true && checkCtaSliderSeen != "true") {
            window.sessionStorage.setItem(`${pageContent.slug}`, "true");
            console.log("how CTA target seen");
            ctaSliderModal(pageContent.acf.case_cta);
          }
        }, 10000);
      } else {
        caseInview = false;
      }
    });
  });

  observer.observe(document.querySelector("#case"));
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
  if (button_id === "caseCta") {
    cta_id = pageContent.acf.case_cta;
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
  document.querySelector("#showreel #reel").pause();
  document.querySelector("html").classList.add("fixed");
  document
    .querySelector("#cta_modal .close")
    .addEventListener("click", closeModal);
  function closeModal() {
    console.log("closeModal");
    document.querySelector("#showreel #reel").play();
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

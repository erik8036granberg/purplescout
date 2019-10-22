"use strict";

let urlID = document.URL;
let urlCase;
if (urlID.includes("/case/")) {
  urlID = urlID.split("case/")[1];
  urlCase = urlID;
} else {
  urlCase = sessionStorage.getItem("caseLink");
}

window.addEventListener("DOMContentLoaded", init);

function init() {
  getPageContent();
  getFooterContent();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#case";
  });
}

// - - - - - - - - - - - get page content  - - - - - - - - - - -
let pageContent;

async function getPageContent() {
  pageContent = await fetchWP(`case?slug=${urlCase}`);
  pageContent = pageContent[0];
  console.log("pageContent");
  console.log(pageContent);
  insertPageContent();
}

function insertPageContent() {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    pageContent.acf.case_seo_title;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - show reel image alternativ image or video sizes - - - - - - - - - - -

  if (pageContent.acf.showreel_image) {
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
      dest
        .querySelector("[data-showreel_video]")
        .setAttribute("src", pageContent.acf.showreel_video_large);
    } else if (window.innerWidth > 500) {
      dest
        .querySelector("[data-showreel_video]")
        .setAttribute("src", pageContent.acf.showreel_video_medium);
    } else {
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
  if (pageContent.acf.main_text.includes("<img")) {
    let p_image = dest.querySelector("p > img");
    dest.querySelector("p > img").parentNode.after(p_image);
  }

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
  factPoints.forEach(getFactPoints);
  let factArray = [];
  async function getFactPoints(factPoint_id) {
    let factPoint = await fetchWP(`facts/${factPoint_id}`);
    factArray.push(factPoint);
    if (factArray.length === factPoints.length) {
      insertFact();
    }
  }

  // - - - - - - - - - - - insert fact points - - - - - - - - - - -

  function insertFact() {
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
  getTestimonialContent();
  getCtaContent();
}

// - - - - - - - - - - - testimonial - - - - - - - - - - -

let testimonialArray;
let getQuote = false;

async function getTestimonialContent() {
  testimonialArray = await fetchWP("testimonial?per_page=100");
  testimonialArray.forEach(quoteItem => {
    if (quoteItem.acf.related_case.includes(pageContent.id)) {
      insertTestimonial(quoteItem);
      getQuote = true;
    }
  });
  if (getQuote == false) {
    document.querySelector(".case_testimonial").style.display = "none";
  }
}

function insertTestimonial(quoteItem) {
  let dest = document.querySelector("[data-testimonial_container]");
  dest.querySelector("[data-testimonial_long_quote]").innerHTML =
    quoteItem.acf.testimonial_long_quote;
  dest.querySelector("[data-testimonial_name]").textContent =
    quoteItem.acf.testimonial_name;
  if (quoteItem.acf.testimonial_title) {
    dest.querySelector("[data-testimonial_company]").textContent =
      quoteItem.acf.testimonial_title +
      ", " +
      quoteItem.acf.testimonial_company;
  } else {
    dest.querySelector("[data-testimonial_company]").textContent =
      quoteItem.acf.testimonial_company;
  }
}

// - - - - - - - - - - - get footer content  - - - - - - - - - -

let footerContent;

async function getFooterContent() {
  footerContent = await fetchWP("pages/412");
  insertFooterContent();
}

// - - - - - - - - - - - insert footer content  - - - - - - - - - -

function insertFooterContent() {
  let dest = document.querySelector("[data-footer_container]");
  dest.querySelector("[data-cph_phone]").textContent =
    footerContent.acf.cph_phone;
  dest
    .querySelector("[data-cph_phone]")
    .setAttribute("href", "tel:" + footerContent.acf.cph_phone);

  dest.querySelector("[data-chp_mail]").textContent =
    footerContent.acf.chp_mail;
  dest
    .querySelector("[data-chp_mail]")
    .setAttribute("href", "mailto:" + footerContent.acf.chp_mail);
  dest.querySelector(
    "[data-website_se]"
  ).textContent = footerContent.acf.website_se.split("//")[1];
  dest
    .querySelector("[data-website_se]")
    .setAttribute("href", footerContent.acf.website_se);
  dest.querySelector(
    "[data-website_dk]"
  ).textContent = footerContent.acf.website_dk.split("//")[1];
  dest
    .querySelector("[data-website_dk]")
    .setAttribute("href", footerContent.acf.website_dk);
  dest
    .querySelector("[data-some_facebook]")
    .setAttribute("href", footerContent.acf.some_facebook);
  dest
    .querySelector("[data-some_instagram]")
    .setAttribute("href", footerContent.acf.some_instagram);
  dest
    .querySelector("[data-some_twitter]")
    .setAttribute("href", footerContent.acf.some_twitter);
  dest
    .querySelector("[data-some_linkedin]")
    .setAttribute("href", footerContent.acf.some_linkedin);
  dest.querySelector("[data-about_text]").innerHTML =
    footerContent.acf.about_text;
  dest
    .querySelector("[data-footer_location_map]")
    .setAttribute("src", footerContent.acf.footer_location_map);
  dest
    .querySelector("[data-footer_location_map]")
    .setAttribute("alt", "Purple Scout location map");
  dest.querySelector("[data-contact_header_copenhagen]").textContent =
    footerContent.acf.contact_header_copenhagen;
  dest.querySelector("[data-contact_address_copenhagen]").innerHTML =
    footerContent.acf.contact_address_copenhagen;
  dest.querySelector("[data-contact_header_malmo]").textContent =
    footerContent.acf.contact_header_malmo;
  dest.querySelector("[data-contact_address_malmo]").innerHTML =
    footerContent.acf.contact_address_malmo;
  dest.querySelector("[data-contact_header_gothenburg]").textContent =
    footerContent.acf.contact_header_gothenburg;
  dest.querySelector("[data-contact_address_gothenburg]").innerHTML =
    footerContent.acf.contact_address_gothenburg;
  dest.querySelector("[data-contact_header_boras]").textContent =
    footerContent.acf.contact_header_boras;
  dest.querySelector("[data-contact_address_boras]").innerHTML =
    footerContent.acf.contact_address_boras;
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
  let caseInview;
  document
    .querySelector("#cta_slider .cta_slider_button")
    .addEventListener("click", () => {
      ctaClicked("caseCta");
    });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        caseInview = true;
        checkCtaSliderSeen = sessionStorage.getItem(pageContent.slug);
        setTimeout(() => {
          if (caseInview == true && checkCtaSliderSeen != "true") {
            window.sessionStorage.setItem(`${pageContent.slug}`, "true");
            ctaSliderModal(pageContent.acf.case_cta);
          }
        }, 10000);
      } else {
        caseInview = false;
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
    closeSlider();
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
  let footer_some = document.querySelector("footer .some").innerHTML;
  document.querySelector("#cta_modal .some").innerHTML = footer_some;
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

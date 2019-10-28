"use strict";
let perfEntries = performance.getEntriesByType("navigation");
let clientUrl = new URLSearchParams(window.location.search);
let clientID = clientUrl.get("go");
let clientActive = sessionStorage.getItem("clientSettings");
let indexScrollTop;
let indexScroll = sessionStorage.getItem("indexScroll");
let currentUrl = document.URL;

window.addEventListener("DOMContentLoaded", init);
window.onload = function() {
  scrollToAnchor();
};

function init() {
  checkClientSettings();
  getPageContent();
  getFooterContent();
  getWorkareaContent();
  circleTurn();
  autoTurn();
  logoSwap();
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#intro";
  });
  document
    .querySelector("#showreel .full_video")
    .addEventListener("click", () => {
      fullVideo();
    });
}

// - - - - - - - - - - - check for URL & session settings  - - - - - - - - - - -

function checkClientSettings() {
  if (clientActive != undefined) {
    getClientContent(clientActive);
  } else if (clientID != undefined) {
    getClientContent(clientID);
  } else {
    getCaseContent();
  }
}

// - - - - - - - - - - - get client settings  - - - - - - - - - - -

let clientSetting;

async function getClientContent(clientID) {
  let clientArray = await fetchWP("client_settings?per_page=100");
  clientArray.forEach(clientItem => {
    if (clientItem.acf.setting_name_number.includes(clientID)) {
      clientSetting = clientItem;
      window.sessionStorage.setItem("clientSettings", clientID);
    }
  });
  getCaseContent();
}

// - - - - - - - - - - - get page content  - - - - - - - - - - -
let pageContent;

async function getPageContent() {
  pageContent = await fetchWP("pages/6");
  insertPageContent();
}

function insertPageContent() {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    pageContent.acf.page_title;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - Show reel - - - - - - - - - - -

  if (pageContent.acf.show_reel_header.includes("...")) {
    dest.querySelector(
      "[data-show_reel_header]"
    ).innerHTML = pageContent.acf.show_reel_header.replace("...", "&nbsp;...");
  } else {
    dest.querySelector("[data-show_reel_header]").textContent =
      pageContent.acf.show_reel_header;
  }

  // - - - - - - - - - - - video - - - - - - - - - - -
  let fullVideo = dest.querySelector("[data-show_reel_full_video]");
  let fullVideoSource = document.createElement("source");

  if (window.innerWidth > 1200) {
    dest
      .querySelector("[data-show_reel_video]")
      .setAttribute("src", pageContent.acf.show_reel_video_large);
    fullVideoSource.setAttribute(
      "src",
      pageContent.acf.show_reel_full_video_large
    );
    fullVideoSource.setAttribute("type", "video/mp4");
    fullVideo.appendChild(fullVideoSource);
  } else if (window.innerWidth > 500) {
    dest
      .querySelector("[data-show_reel_video]")
      .setAttribute("src", pageContent.acf.show_reel_video_medium);
    fullVideoSource.setAttribute(
      "src",
      pageContent.acf.show_reel_full_video_medium
    );
    fullVideoSource.setAttribute("type", "video/mp4");
    fullVideo.appendChild(fullVideoSource);
  } else {
    dest
      .querySelector("[data-show_reel_video]")
      .setAttribute("src", pageContent.acf.show_reel_video_small);
    fullVideoSource.setAttribute(
      "src",
      pageContent.acf.show_reel_full_video_small
    );
    fullVideoSource.setAttribute("type", "video/mp4");
    fullVideo.appendChild(fullVideoSource);
  }

  // - - - - - - - - - - - intro section  - - - - - - - - - - -

  dest.querySelector("[data-intro_header]").textContent =
    pageContent.acf.intro_header;
  dest.querySelector("[data-intro_text]").innerHTML =
    pageContent.acf.intro_text;

  // - - - - - - - - - - - cases section  - - - - - - - - - - -

  dest.querySelector("[data-cases_header]").textContent =
    pageContent.acf.cases_header;
  dest.querySelector("[data-cases_text]").innerHTML =
    pageContent.acf.cases_text;

  // - - - - - - - - - - - what section  - - - - - - - - - - -

  dest.querySelector("[data-what_header]").textContent =
    pageContent.acf.what_header;
  dest.querySelector("[data-what_text]").innerHTML = pageContent.acf.what_text;

  // - - - - - - - - - - - how section  - - - - - - - - - - -

  dest.querySelector("[data-how_header]").textContent =
    pageContent.acf.how_header;
  dest.querySelector("[data-how_text]").innerHTML = pageContent.acf.how_text;

  dest.querySelector("[data-how_discover_header]").textContent =
    pageContent.acf.how_discover_header;
  dest.querySelector("[data-how_discover_text]").innerHTML =
    pageContent.acf.how_discover_text;

  dest.querySelector("[data-how_data_header]").textContent =
    pageContent.acf.how_data_header;
  dest.querySelector("[data-how_data_text]").innerHTML =
    pageContent.acf.how_data_text;

  dest.querySelector("[data-how_design_header]").textContent =
    pageContent.acf.how_design_header;
  dest.querySelector("[data-how_design_text]").innerHTML =
    pageContent.acf.how_design_text;

  dest.querySelector("[data-how_develop_header]").textContent =
    pageContent.acf.how_develop_header;
  dest.querySelector("[data-how_develop_text]").innerHTML =
    pageContent.acf.how_develop_text;

  dest.querySelector("[data-how_deliver_header]").textContent =
    pageContent.acf.how_deliver_header;
  dest.querySelector("[data-how_deliver_text]").innerHTML =
    pageContent.acf.how_deliver_text;

  // - - - - - - - - - - - how section backgournd images - - - - - - - - - - -

  if (window.innerWidth > 1200) {
    dest.querySelector(
      "[data-discover_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_discover_image.url})`;
    dest.querySelector(
      "[data-data_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_data_image.url})`;
    dest.querySelector(
      "[data-design_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_design_image.url})`;
    dest.querySelector(
      "[data-develop_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_develop_image.url})`;
    dest.querySelector(
      "[data-deliver_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_deliver_image.url})`;
  } else if (window.innerWidth > 900) {
    dest.querySelector("[data-discover_bg]").style.backgroundImage = `url(${
      pageContent.acf.how_discover_image.sizes["post-thumbnail"]
    })`;
    dest.querySelector("[data-data_bg]").style.backgroundImage = `url(${
      pageContent.acf.how_data_image.sizes["post-thumbnail"]
    })`;
    dest.querySelector("[data-design_bg]").style.backgroundImage = `url(${
      pageContent.acf.how_design_image.sizes["post-thumbnail"]
    })`;
    dest.querySelector("[data-develop_bg]").style.backgroundImage = `url(${
      pageContent.acf.how_develop_image.sizes["post-thumbnail"]
    })`;
    dest.querySelector("[data-deliver_bg]").style.backgroundImage = `url(${
      pageContent.acf.how_deliver_image.sizes["post-thumbnail"]
    })`;
  } else {
    dest.querySelector(
      "[data-discover_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_discover_image.sizes.medium_large})`;
    dest.querySelector(
      "[data-data_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_data_image.sizes.medium_large})`;
    dest.querySelector(
      "[data-design_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_design_image.sizes.medium_large})`;
    dest.querySelector(
      "[data-develop_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_develop_image.sizes.medium_large})`;
    dest.querySelector(
      "[data-deliver_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_deliver_image.sizes.medium_large})`;
  }
  getTestimonialContent();
  getCtaContent();
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

// - - - - - - - - - - - get Testimonials content  - - - - - - - - - - -

let testimonialArray = [];
let filteredTestimonialArray = [];
let sw_i = 0;

async function getTestimonialContent() {
  testimonialArray = await fetchWP("testimonial?per_page=100");
  testimonialArray.forEach(testimonialItem => {
    filteredTestimonialArray.push(testimonialItem);
    if (testimonialItem.acf.testimonial_short_quote_2) {
      let deepClone = JSON.parse(JSON.stringify(testimonialItem));
      deepClone.acf.testimonial_short_quote =
        testimonialItem.acf.testimonial_short_quote_2;
      filteredTestimonialArray.push(deepClone);
    }
    if (testimonialItem.acf.testimonial_short_quote_3) {
      let deepClone = JSON.parse(JSON.stringify(testimonialItem));
      deepClone.acf.testimonial_short_quote =
        testimonialItem.acf.testimonial_short_quote_3;
      filteredTestimonialArray.push(deepClone);
    }
  });
  const bubble_ouline = `
  <svg id="quote_line" xmlns="http://www.w3.org/2000/svg" width="448" height="580.8" viewBox="0 0 448 580.8">
  <defs>
    <style>
    </style>
  </defs>
  <title>quote_line</title>
  <polygon class="cls-1 outline" points="58.5 578.5 118.09 507.5 0.5 507.5 0.5 0.5 447.5 0.5 447.5 507.5 166.18 507.5 58.5 578.5"/>
</svg>`;
  document.querySelector("#intro #quote_outline").innerHTML = bubble_ouline;
  filteredTestimonialArray.sort(() => {
    return 0.5 - Math.random();
  });
  displayTestimonial(filteredTestimonialArray[sw_i]);
}

function displayTestimonial(testimonial) {
  caseArray.forEach(caseItem => {
    if (testimonial.acf.related_case.includes(caseItem.id)) {
      document
        .querySelector("[data-quote_link]")
        .setAttribute(
          "href",
          `https://explore.purplescout.dk/case/${caseItem.slug}`
        );
      document.querySelector("#intro .bubble").addEventListener("click", () => {
        window.sessionStorage.setItem("caseLink", caseItem.slug);
        window.sessionStorage.setItem("indexScroll", indexScrollTop);
      });
      document.querySelector("#intro .swop_frame").onmouseenter = function() {
        document.querySelector("#intro svg .outline").classList.add("hover");
        document.querySelector("#intro .bubble").style.cursor = "pointer";
      };
      document.querySelector("#intro .swop_frame").onmouseleave = function() {
        document.querySelector("#intro svg .outline").classList.remove("hover");
        document.querySelector("#intro .bubble").style.cursor = "none";
      };
    }
  });
  document.querySelector("#intro .bubble").classList.remove("fade_out");
  document.querySelector("#intro .bubble").classList.add("move_out");
  document.querySelector("[data-testimonial_quote]").innerHTML = "";
  document.querySelector("[data-testimonial_name]").innerHTML = "";
  document.querySelector("[data-testimonial_company]").innerHTML = "";
  document.querySelector("#intro .outline").classList.remove("drawline");
  document.querySelector("[data-testimonial_quote]").innerHTML =
    testimonial.acf.testimonial_short_quote;
  document.querySelector("[data-testimonial_name]").textContent =
    testimonial.acf.testimonial_name;
  if (testimonial.acf.testimonial_title) {
    document.querySelector("[data-testimonial_company]").textContent =
      testimonial.acf.testimonial_title +
      ", " +
      testimonial.acf.testimonial_company;
  } else {
    document.querySelector("[data-testimonial_company]").textContent =
      testimonial.acf.testimonial_company;
  }
  document.querySelector("#intro .bubble").classList.remove("move_out");
  document.querySelector("#intro .bubble").classList.add("move_in");
  setTimeout(() => {
    document.querySelector("#intro .outline").classList.add("drawline");
    setTimeout(() => {
      document.querySelector("#intro .bubble").classList.remove("move_in");
      document.querySelector("#intro .bubble").classList.add("fade_out");
      setTimeout(() => {
        sw_i++;
        if (sw_i <= filteredTestimonialArray.length - 1) {
          displayTestimonial(filteredTestimonialArray[sw_i]);
        } else {
          sw_i = 0;
          displayTestimonial(filteredTestimonialArray[0]);
        }
      }, 2000);
    }, 5000);
  }, 2500);
}

// - - - - - - - - - - - get cases content  - - - - - - - - - - -

let caseArray = [];
let activeFilter;
let filterID = "all";
let caseCount;

async function getCaseContent() {
  let clientSettingsFilter = sessionStorage.getItem("clientSettings");
  let getCases = await fetchWP("case?per_page=100");
  if (clientSettingsFilter != undefined) {
    let clientSettingArray = clientSetting.acf.show_cases;
    clientSettingArray.forEach(clientCase => {
      getCases.forEach(clientItem => {
        if (clientItem.id === clientCase) {
          showCases(clientItem);
          caseArray.push(clientItem);
          caseCount++;
        }
      });
    });
  } else {
    caseArray = getCases;
    console.log(caseArray);
    caseArray.forEach(showCases);
    caseCount = caseArray.length;
  }
  filtercaseNav();
}

function filtercaseNav() {
  // filter dropdown nav - mouseover setup
  document.querySelector("#cases .filter").addEventListener("mouseover", () => {
    document.querySelector("#cases .filter_nav ul").classList.remove("closed");
    document.querySelector("#cases .filter_nav ul").classList.add("open");
  });
  document
    .querySelector("#cases .dropdown")
    .addEventListener("mouseleave", () => {
      document.querySelector("#cases .filter_nav ul").classList.remove("open");
      document.querySelector("#cases .filter_nav ul").classList.add("closed");
    });
  document
    .querySelector("#cases .filter_nav ul")
    .addEventListener("click", () => {
      document.querySelector("#cases .filter_nav ul").classList.remove("open");
      document.querySelector("#cases .filter_nav ul").classList.add("closed");
    });
  document
    .querySelector(".filter_nav #filter_all")
    .addEventListener("click", () => {
      filterID = "all";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_197")
    .addEventListener("click", () => {
      filterID = "197";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_202")
    .addEventListener("click", () => {
      filterID = "202";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_203")
    .addEventListener("click", () => {
      filterID = "203";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_204")
    .addEventListener("click", () => {
      filterID = "204";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_205")
    .addEventListener("click", () => {
      filterID = "205";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_206")
    .addEventListener("click", () => {
      filterID = "206";
      filterCases();
    });
  document
    .querySelector(".filter_nav #filter_207")
    .addEventListener("click", () => {
      filterID = "207";
      filterCases();
    });
}

function filterCases() {
  let caseCount = 0;
  if (filterID !== activeFilter) {
    activeFilter = filterID;
    let activeLabel = document.querySelector(`#filter_${filterID}`).textContent;
    document.querySelector("#cases .filter").textContent = activeLabel;
    document.querySelector("#cases .filter").style.color = "#fff";
    document.querySelector("#cases .filter").classList.remove("filter_off");
    document.querySelector("#cases .showcase").classList.remove("zoomup");
    document.querySelector("#cases .filter").classList.add("filter_on");
    document.querySelector("#cases .showcase").classList.add("zoomdown");
    setTimeout(() => {
      document.querySelector("#cases .showcase").innerHTML = "";
      document.querySelector("#cases .showcase").classList.remove("zoomdown");
      document.querySelector("#cases .showcase").classList.add("zoomup");
      if (filterID == "all") {
        caseArray.forEach(showCases);
        caseCount = caseArray.length;
        setTimeout(() => {
          document
            .querySelector("#cases .filter")
            .classList.remove("filter_on");
          document.querySelector("#cases .filter").classList.add("filter_off");
          document.querySelector("#cases .filter").style.color =
            "var(--bg_purple_3)";
          document.querySelector("#cases .filter").textContent = "Filter cases";
        }, 3000);
      } else {
        caseArray.forEach(caseItem => {
          caseItem.acf.work_areas_symbols.forEach(workareaID => {
            if (workareaID == filterID) {
              showCases(caseItem);
              caseCount++;
            }
          });
        });
      }
      if (caseCount == 0) {
        const makeDiv = document.createElement("DIV");
        makeDiv.setAttribute("class", "case_count_message");
        makeDiv.innerHTML = `No cases related to <span>${activeLabel}</span> published yet.`;
        document.querySelector("#cases .showcase").appendChild(makeDiv);
      }
    }, 500);
  }
}

// - - - - - - - - - - - - - display cases - - - - - - - - - - - - -

function showCases(caseItem) {
  const template = document.querySelector("[data-cases_template]").content;
  const clone = template.cloneNode(true);

  clone.querySelector("[data-id]").setAttribute("id", caseItem.slug);
  clone
    .querySelector("[data-link]")
    .setAttribute(
      "href",
      `https://explore.purplescout.dk/case/${caseItem.slug}`
    );
  clone.querySelector("[data-id]").addEventListener("click", () => {
    window.sessionStorage.setItem("caseLink", caseItem.slug);
    window.sessionStorage.setItem("indexScroll", indexScrollTop);
  });
  clone
    .querySelector("[data-video_still_image]")
    .setAttribute("src", caseItem.acf.video_still_image.sizes.medium_large);
  clone
    .querySelector("[data-video_still_image]")
    .setAttribute("alt", caseItem.acf.company);
  clone.querySelector("[data-description_header]").textContent =
    caseItem.acf.description_header;
  clone.querySelector("[data-company]").textContent = caseItem.acf.company;
  document.querySelector("[data-cases_container]").appendChild(clone);
  casesScollEffect();
}

// - - - - - - - - - - - get work areas content  - - - - - - - - - - -

async function getWorkareaContent() {
  let workareaArray = [];
  let clientSettingsFilter = sessionStorage.getItem("clientSettings");
  let getWorkareas = await fetchWP("workareas?per_page=100");
  if (clientSettingsFilter != undefined) {
    let clientSettingArray = clientSetting.acf.show_workareas;
    clientSettingArray.forEach(clientWorkarea => {
      getWorkareas.forEach(clientItem => {
        if (clientItem.id === clientWorkarea) {
          showWorkareas(clientItem);
        }
      });
    });
  } else {
    workareaArray = getWorkareas;
    workareaArray.forEach(showWorkareas);
  }
}

// - - - - - - - - - - - - - display work areas - - - - - - - - - - - - -

function showWorkareas(workareaItem) {
  const template = document.querySelector("[data-workareas_template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-area_id]").setAttribute("id", workareaItem.slug);
  clone.querySelector("[data-area_header]").textContent =
    workareaItem.acf.area_header;
  clone.querySelector("[data-area_header]").addEventListener("click", () => {
    window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
    window.sessionStorage.setItem("indexScroll", indexScrollTop);
  });
  clone
    .querySelector("[data-area_symbol]")
    .setAttribute("src", workareaItem.acf.area_symbol);
  clone
    .querySelector("[data-area_symbol]")
    .setAttribute("alt", "symbol for" + workareaItem.acf.area_header);
  clone.querySelector("[data-area_symbol]").addEventListener("click", () => {
    window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
    window.sessionStorage.setItem("indexScroll", indexScrollTop);
  });
  clone
    .querySelector("[data-area_symbol]")
    .setAttribute("alt", workareaItem.acf.area_header);
  clone.querySelector("[data-area_abstract]").innerHTML =
    workareaItem.acf.area_abstract;
  clone
    .querySelector("[data-area_link]")
    .setAttribute(
      "href",
      `https://explore.purplescout.dk/workarea/${workareaItem.slug}`
    );
  clone.querySelector("[data-workarea_arrow]").addEventListener("click", () => {
    window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
    window.sessionStorage.setItem("indexScroll", indexScrollTop);
  });
  document.querySelector("[data-workareas_container]").appendChild(clone);
}

function fullVideo() {
  document.querySelector("#showreel #videomodal").classList.add("show");
  document.querySelector("#showreel #reel").pause();
  document.querySelector("#showreel #full").play();
  document.querySelector("html").classList.add("fixed");
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  document
    .querySelector("#showreel #videomodal .close")
    .addEventListener("click", closeModal);
  function closeModal() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    document
      .querySelector("#showreel #videomodal .close")
      .removeEventListener("click", closeModal);
    document.querySelector("#showreel #full").pause();
    document.querySelector("#showreel #reel").play();
    document.querySelector("#showreel #videomodal").classList.remove("show");
    document.querySelector("html").classList.remove("fixed");
  }
}

// - - - - - - - - - - - get cta content  - - - - - - - - - - -

let getCtaArray;
let checkCtaSliderSeen;

async function getCtaContent() {
  getCtaArray = await fetchWP("cta?per_page=100");
  showreelCtaObserver();
  setTimeout(() => {
    casesCtaObserver();
    howCtaObserver();
  }, 2000);
}

// - - - - - - - - - - - - - CTA showreel observer - - - - - - - - - - - - -

function showreelCtaObserver() {
  let showreelButtonSeen = false;
  let showreelInview;

  document.querySelector("#showreel .cta").addEventListener("click", () => {
    ctaClicked("showreelCta");
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        showreelInview = true;
        setTimeout(() => {
          if (showreelInview == true && showreelButtonSeen == false) {
            showreelButtonSeen = true;
            document
              .querySelector("#showreel .cta")
              .classList.add("show_showreel_cta");
          }
        }, 5000);
      } else {
        showreelInview = false;
      }
    });
  });

  observer.observe(document.querySelector("#showreel .header"));
}

// - - - - - - - - - - - - - CTA Cases observer - - - - - - - - - - - - -

function casesCtaObserver() {
  let casesInview;
  document
    .querySelector("#cta_slider .cta_slider_button")
    .addEventListener("click", () => {
      ctaClicked("casesCta");
    });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        casesInview = true;
        checkCtaSliderSeen = sessionStorage.getItem("ctaSliderSeen");
        setTimeout(() => {
          if (casesInview == true && checkCtaSliderSeen != "true") {
            window.sessionStorage.setItem("ctaSliderSeen", "true");
            ctaSliderModal(pageContent.acf.cases_cta);
          }
        }, 5000);
      } else {
        casesInview = false;
      }
    });
  });

  observer.observe(document.querySelector(".showcase"));
}

// - - - - - - - - - - - - - CTA How observer - - - - - - - - - - - - -

function howCtaObserver() {
  let howInview;
  document
    .querySelector("#cta_slider .cta_slider_button")
    .addEventListener("click", () => {
      ctaClicked("howCta");
    });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        howInview = true;
        checkCtaSliderSeen = sessionStorage.getItem("ctaSliderSeen");
        setTimeout(() => {
          if (howInview == true && checkCtaSliderSeen != "true") {
            window.sessionStorage.setItem("ctaSliderSeen", "true");
            ctaSliderModal(pageContent.acf.how_cta);
          }
        }, 5000);
      } else {
        howInview = false;
      }
    });
  });

  observer.observe(document.querySelector("#how .content"));
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
  if (button_id === "showreelCta") {
    cta_id = pageContent.acf.show_reel_cta;
  }
  if (button_id === "casesCta") {
    closeSlider();
    cta_id = pageContent.acf.cases_cta;
  }
  if (button_id === "howCta") {
    closeSlider();
    cta_id = pageContent.acf.how_cta;
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
  document.querySelector("#showreel #reel").pause();
  document.querySelector("html").classList.add("fixed");
  document
    .querySelector("#cta_modal .close")
    .addEventListener("click", closeModal);
  function closeModal() {
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

// - - - - - - - - - - - How circle  - - - - - - - - - - -

function circleTurn() {
  document.querySelector("#discover").addEventListener("click", () => {
    rotateTo("0", "discover");
  });
  document.querySelector("#data").addEventListener("click", () => {
    rotateTo("1", "data");
  });
  document.querySelector("#design").addEventListener("click", () => {
    rotateTo("2", "design");
  });
  document.querySelector("#develop").addEventListener("click", () => {
    rotateTo("3", "develop");
  });
  document.querySelector("#deliver").addEventListener("click", () => {
    rotateTo("4", "deliver");
  });

  document.querySelector(".blt_discover").addEventListener("click", () => {
    rotateTo("0", "discover");
  });
  document.querySelector(".blt_data").addEventListener("click", () => {
    rotateTo("1", "data");
  });
  document.querySelector(".blt_design").addEventListener("click", () => {
    rotateTo("2", "design");
  });
  document.querySelector(".blt_develop").addEventListener("click", () => {
    rotateTo("3", "develop");
  });
  document.querySelector(".blt_deliver").addEventListener("click", () => {
    rotateTo("4", "deliver");
  });
}

function rotateTo(number, id) {
  let roteateDeg = number * 72 + "deg";
  document.querySelector(".orbit").style.transform = `rotateZ(-${roteateDeg})`;

  const allItems = document.querySelectorAll(".item");
  allItems.forEach(el => {
    el.style.transform = `rotate(${roteateDeg})`;
  });

  const removeActive = document.querySelectorAll(".active");
  removeActive.forEach(el => {
    el.classList.remove("active");
  });

  document.querySelector("#how ." + id).classList.add("active");
  document.querySelector("#how .blt_" + id).classList.add("active");
  textItem(number, id);
  changeBg(id);
}

function textItem(number, id) {
  let slideValue = "-" + number * 100 + "%";
  document.querySelector(
    "#slider"
  ).style.transform = `translateY(${slideValue})`;
  const textFade = document.querySelectorAll("#how .placeholder");
  textFade.forEach(el => {
    el.classList.add("hide");
  });
  setTimeout(() => {
    document.querySelector("#" + id + "_text").classList.remove("hide");
  }, 500);
}

function changeBg(id) {
  const hideAllBgs = document.querySelectorAll("#how .background");
  hideAllBgs.forEach(el => {
    el.classList.add("hide_bg");
  });
  document.querySelector("#how ." + id + "_bg").classList.remove("hide_bg");
}

let autoTurnOn = "on";
let autoTurnTime = 7000;
document.querySelector("#how .content").addEventListener("click", () => {
  autoTurnOn = "off";
});

const circleArray = [
  { number: "0", id: "discover" },
  { number: "1", id: "data" },
  { number: "2", id: "design" },
  { number: "3", id: "develop" },
  { number: "4", id: "deliver" }
];

let i = 0;
function autoTurn() {
  if (autoTurnOn == "on") {
    i++;
    setTimeout(() => {
      if (autoTurnOn == "on") {
        if (i <= 4) {
          rotateTo(i, circleArray[i].id);
          autoTurn();
        } else {
          i = 0;
          rotateTo(i, circleArray[i].id);
          autoTurn();
        }
      }
    }, autoTurnTime);
  } else {
    return;
  }
}

function casesScollEffect() {
  if (window.innerWidth > 700) {
    ScrollOut({
      targets: ".case",
      threshold: 0.9,
      once: false
    });
  } else {
    ScrollOut({
      targets: ".case",
      threshold: 0.2,
      once: false,
      offset: 0
    });
  }
}

// - - - - - - - - - - - Case logo swap - - - - - - - - - - -

function logoSwap() {
  let logoArray = [];
  let showLogos;
  let activeArray = [];
  let hiddenArray = [];

  // get logos
  fetch("/wordpress/wp-json/wp/v2/logo?per_page=100")
    .then(response => response.json())
    .then(myJson => {
      let getLogos = myJson;
      //fix id
      getLogos.forEach(logo => {
        const converted = convert(logo.title.rendered);
        logo.id = "id-" + converted.toLowerCase();
      });
      logoArray = getLogos;
      arrangeArrays();
    });

  function arrangeArrays() {
    // visible logos - mobile or larger
    if (window.innerWidth < 700) {
      showLogos = 4;
    } else if (window.innerWidth < 1200) {
      showLogos = 6;
    } else {
      showLogos = 8;
    }

    // Divide logos to visible and hidden array
    let numberOfLogos = logoArray.length;
    activeArray = logoArray.slice(0, showLogos);
    hiddenArray = logoArray.slice(showLogos, numberOfLogos);
    //import svg to DOM
    activeArray.forEach(svgImportActive);
    hiddenArray.forEach(svgImportHidden);
    setTimeout(() => {
      swapShowSVG();
    }, 3000);
  }

  function swapShowSVG() {
    // set a timer
    setTimeout(() => {
      // get a random id from the active array to pick a DOM element
      let random = Math.floor(Math.random() * showLogos);
      let randomLogo = activeArray[random];
      // disappear animation
      document.querySelector("#activelogos ." + randomLogo.id).style.opacity =
        "0";
      // get new logo array, id & content
      let newLogo = hiddenArray[0];
      let newLogoID = hiddenArray[0].id;
      let newLogoSvg = document.querySelector(
        "#hiddenlogos ." + hiddenArray[0].id
      ).innerHTML;
      setTimeout(() => {
        //insert new logo
        let randomID = activeArray[random].id;
        let randomSvg = document.querySelector("#activelogos ." + randomID)
          .innerHTML;
        document.querySelector(
          "#activelogos ." + randomLogo.id
        ).innerHTML = newLogoSvg;
        document
          .querySelector("#activelogos ." + randomLogo.id)
          .setAttribute("class", newLogoID);
        document.querySelector("#activelogos ." + newLogoID).style.opacity =
          "1";

        //remove hidden logo and insert replaced
        let newLogoRemove = document.querySelector(
          "#hiddenlogos ." + hiddenArray[0].id
        );
        newLogoRemove.remove();
        const makeDiv = document.createElement("DIV");
        makeDiv.setAttribute("class", randomID);
        document.querySelector("#hiddenlogos").appendChild(makeDiv);
        document.querySelector(
          "#hiddenlogos ." + randomID
        ).innerHTML = randomSvg;

        // rearrange arrays
        activeArray.splice(random, 1);
        activeArray.push(newLogo);
        hiddenArray.shift();
        hiddenArray.push(randomLogo);
        swapShowSVG();
      }, 1000);
    }, 1000);
  }

  function svgImportActive(displayLogo) {
    fetch(displayLogo.acf.logo_image)
      .then(response => response.text())
      .then(svgdata => {
        const makeDiv = document.createElement("DIV");
        makeDiv.setAttribute("class", displayLogo.id);
        document.querySelector("#activelogos").appendChild(makeDiv);
        document
          .querySelector("." + displayLogo.id)
          .insertAdjacentHTML("afterbegin", svgdata);
      });
  }

  function svgImportHidden(displayLogo) {
    fetch(displayLogo.acf.logo_image)
      .then(response => response.text())
      .then(svgdata => {
        const makeDiv = document.createElement("DIV");
        makeDiv.setAttribute("class", displayLogo.id);
        document.querySelector("#hiddenlogos").appendChild(makeDiv);
        document
          .querySelector("." + displayLogo.id)
          .insertAdjacentHTML("afterbegin", svgdata);
      });
  }
}

function convert(str) {
  str = str.replace(/æ/g, "ae");
  str = str.replace(/ø/g, "oe");
  str = str.replace(/å/g, "aa");
  str = str.replace(/Æ/g, "ae");
  str = str.replace(/Ø/g, "oe");
  str = str.replace(/Å/g, "aa");
  str = str.replace(/\s+/g, "-");
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
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

function scrollToAnchor() {
  window.addEventListener("scroll", getScrollValue);
  function getScrollValue() {
    indexScrollTop = window.scrollY || document.documentElement.scrollTop;
  }
  if (
    perfEntries[0].type === "back_forward" ||
    perfEntries[0].type === "reload"
  ) {
    if (indexScroll != undefined) {
      scrollToPossition();
    } else {
      scrollToID();
    }
  }
  if (perfEntries[0].type === "navigate") {
    scrollToID();
  }
}

function scrollToPossition() {
  setTimeout(() => {
    window.scrollTo({
      top: indexScroll,
      left: 0,
      behavior: "smooth"
    });
  }, 1500);
}

function scrollToID() {
  if (currentUrl.includes("#")) {
    const achor = "#" + currentUrl.split("#")[1];
    setTimeout(() => {
      document.querySelector(achor).scrollIntoView({
        behavior: "smooth"
      });
      sessionStorage.removeItem("indexScroll");
    }, 1500);
  }
}

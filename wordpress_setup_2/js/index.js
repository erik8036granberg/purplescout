"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  getPageContent();
  getTestimonialContent();
  getCaseContent();
  getWorkareaContent();
  getCtaContent();
  circleTurn();
  autoTurn();
  logoSwap();
  // if (window.innerWidth < 900) {
  //   mobileHowCircle();
  // }
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#intro";
  });
  document
    .querySelector("#showreel .full_video")
    .addEventListener("click", () => {
      fullVideo();
    });
}

// - - - - - - - - - - - get page content  - - - - - - - - - - -

async function getPageContent() {
  let pageContent = await fetchWP("pages/6");
  insertPageContent(pageContent);
}

function insertPageContent(pageContent) {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - page title & description - - - - - - - - - - -

  dest.querySelector("[data-page_title]").textContent =
    pageContent.acf.page_title;
  dest
    .querySelector("[data-seo_description]")
    .setAttribute("content", pageContent.acf.seo_description);

  // - - - - - - - - - - - Show reel - - - - - - - - - - -

  dest.querySelector("[data-show_reel_header]").textContent =
    pageContent.acf.show_reel_header;

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
    dest.querySelector(
      "[data-discover_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_discover_image.sizes
      .post - thumbnail})`;
    dest.querySelector(
      "[data-data_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_data_image.sizes.post -
      thumbnail})`;
    dest.querySelector(
      "[data-design_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_design_image.sizes
      .post - thumbnail})`;
    dest.querySelector(
      "[data-develop_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_develop_image.sizes
      .post - thumbnail})`;
    dest.querySelector(
      "[data-deliver_bg]"
    ).style.backgroundImage = `url(${pageContent.acf.how_deliver_image.sizes
      .post - thumbnail})`;
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
}

// - - - - - - - - - - - get Testimonials content  - - - - - - - - - - -

let testimonialArray = [];
let sw_i = 0;
let tmInview = "false";

async function getTestimonialContent() {
  testimonialArray = await fetchWP("testimonial?per_page=100");
  let tmObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        tmInview = "true";
        console.log("true");
        document.querySelector("#intro .case_testimonial").style.height =
          "auto";
      } else {
        console.log("false");
        tmInview = "false";
        document.querySelector("#intro .case_testimonial").style.height = "0";
      }
    });
  });
  tmObserver.observe(document.querySelector("#intro .case_testimonial"));
  displayTestimonial(testimonialArray[sw_i]);
}

function displayTestimonial(testimonial) {
  console.log("display new testimonial");
  document.querySelector("[data-testimonial_quote]").innerHTML = "";
  document.querySelector("[data-testimonial_name]").innerHTML = "";
  document.querySelector("[data-testimonial_company]").innerHTML = "";
  document
    .querySelector("#intro .case_testimonial .bubble")
    .classList.remove("quote_contract");
  document
    .querySelector("#intro .case_testimonial .bubble")
    .classList.add("quote_expand");
  document
    .querySelector("[data-testimonial_quote]")
    .classList.remove("quote_expand");
  document
    .querySelector("[data-testimonial_name]")
    .classList.remove("quote_expand");
  document
    .querySelector("[data-testimonial_company]")
    .classList.remove("quote_expand");
  document.querySelector("#intro .quote_wrapper").style.opacity = "1";
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
  document.querySelector("[data-testimonial_quote]").innerHTML =
    testimonial.acf.testimonial_quote;
  setTimeout(() => {
    document
      .querySelector("[data-testimonial_quote]")
      .classList.add("quote_expand");
    setTimeout(() => {
      document.querySelector("[data-testimonial_name]").style.opacity = "1";
      document
        .querySelector("[data-testimonial_name]")
        .classList.add("quote_expand");
      document.querySelector("[data-testimonial_company]").style.opacity = "1";
      document
        .querySelector("[data-testimonial_company]")
        .classList.add("quote_expand");
      setTimeout(() => {
        document.querySelector("#intro .quote_wrapper").style.opacity = "0";
        document
          .querySelector("#intro .case_testimonial .bubble")
          .classList.remove("quote_expand");
        document
          .querySelector("#intro .case_testimonial .bubble")
          .classList.add("quote_contract");
        setTimeout(() => {
          sw_i++;
          if (sw_i <= testimonialArray.length - 1) {
            displayTestimonial(testimonialArray[sw_i]);
          } else {
            sw_i = 0;
            displayTestimonial(testimonialArray[0]);
          }
        }, 3000);
      }, 5000);
    }, 1000);
  }, 500);
}

// - - - - - - - - - - - get cases content  - - - - - - - - - - -

async function getCaseContent() {
  let caseArray = [];
  let getCases = await fetchWP("case?per_page=100");
  getCases.forEach(caseItem => {
    caseItem.id = caseItem.slug;
  });
  caseArray = getCases;
  caseArray.forEach(showCases);
  if (caseArray.length === getCases.length) {
    casesScollEffect();
  }
}

// - - - - - - - - - - - - - display cases - - - - - - - - - - - - -

function showCases(caseItem) {
  const template = document.querySelector("[data-cases_template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-id]").setAttribute("id", caseItem.slug);
  clone
    .querySelector("[data-video_still_image]")
    .setAttribute("src", caseItem.acf.video_still_image.sizes.medium_large);
  clone
    .querySelector("[data-video_still_image]")
    .setAttribute("alt", caseItem.acf.company);
  clone.querySelector("[data-company]").textContent = caseItem.acf.company;
  clone.querySelector("[data-description_header]").textContent =
    caseItem.acf.description_header;
  clone.querySelector("[data-solution]").textContent = caseItem.acf.solution;
  clone.querySelector("[data-id]").addEventListener("click", () => {
    window.location.href = "case.html?id=" + caseItem.slug;
    window.sessionStorage.setItem("caseLink", caseItem.slug);
  });
  document.querySelector("[data-cases_container]").appendChild(clone);
}

// - - - - - - - - - - - get work areas content  - - - - - - - - - - -

async function getWorkareaContent() {
  let workareaArray = [];
  let getWorkareas = await fetchWP("workareas?per_page=100");
  //fix id
  getWorkareas.forEach(workareaItem => {
    workareaItem.id = workareaItem.slug;
  });
  workareaArray = getWorkareas;
  workareaArray.forEach(showWorkareas);
}

// - - - - - - - - - - - - - display work areas - - - - - - - - - - - - -

function showWorkareas(workareaItem) {
  const template = document.querySelector("[data-workareas_template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-area_id]").setAttribute("id", workareaItem.slug);
  clone.querySelector("[data-area_header]").textContent =
    workareaItem.acf.area_header;
  clone.querySelector("[data-area_header]").addEventListener("click", () => {
    window.location.href = "workarea.html?id=" + workareaItem.slug;
    window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
  });
  clone
    .querySelector("[data-area_symbol]")
    .setAttribute("src", workareaItem.acf.area_symbol);
  clone.querySelector("[data-area_symbol]").addEventListener("click", () => {
    window.location.href = "workarea.html?id=" + workareaItem.slug;
    window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
  });
  clone
    .querySelector("[data-area_symbol]")
    .setAttribute("alt", workareaItem.acf.area_header);
  clone.querySelector("[data-area_abstract]").innerHTML =
    workareaItem.acf.area_abstract;
  clone.querySelector("[data-workarea_arrow]").addEventListener("click", () => {
    window.location.href = "workarea.html?id=" + workareaItem.slug;
    window.sessionStorage.setItem("workAreaLink", workareaItem.slug);
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

async function getCtaContent() {
  getCtaArray = await fetchWP("cta?per_page=100");
  ctaButtons();
}

// - - - - - - - - - - - - - set CTA elements - - - - - - - - - - - - -

let showreelButtonSeen = false;

function ctaButtons() {
  const ctaArray = [
    {
      id: "showreelCta",
      seen: showreelButtonSeen,
      path: "#showreel .cta",
      target: "#showreel .header",
      time: "5000"
    }
  ];
  ctaArray.forEach(CtaButtonDelay);
}

// - - - - - - - - - - - - - CTA pop up delay - - - - - - - - - - - - -

function CtaButtonDelay(ctaButon) {
  let inview;

  document.querySelector(ctaButon.path).addEventListener("click", () => {
    ctaClicked(ctaButon.id);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        inview = true;
        setTimeout(() => {
          if (inview == true && ctaButon.seen == false) {
            console.log("Seen for 5 sec for the first time");
            ctaButon.seen = true;
            document.querySelector(ctaButon.path).classList.add("appear");
          }
        }, ctaButon.time);
      } else {
        inview = false;
      }
    });
  });

  observer.observe(document.querySelector(ctaButon.target));
}

// - - - - - - - - - - - Cta button clicked  - - - - - - - - - - -

function ctaClicked(button_id) {
  let cta_id;
  if (button_id === "showreelCta") {
    cta_id = "293";
  }
  let ctaFilter = getCtaArray.filter(function(ctaItem) {
    return ctaItem.id == cta_id;
  });
  ctaFilter.forEach(displayCta);
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
  clone.querySelector("[data-cta_mail]").textContent = ctaItem.acf.cta_mail;
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
    el.classList.add("hide");
  });
  document.querySelector("#how ." + id + "_bg").classList.remove("hide");
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
  ScrollOut({
    targets: ".case",
    threshold: 0.8,
    once: false
  });
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

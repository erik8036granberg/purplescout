"use strict";

let showreelButton = false;
let currantNumber = "0";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getPageContent();
  getCaseContent();
  document.querySelector(".year").innerHTML = new Date().getFullYear();
  showreelCta();
  circleTurn();
  autoTurn();
  casesScollEffect();
  logoSwap();
  // if (window.innerWidth < 900) {
  //   mobileHowCircle();
  // }
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "#intro";
  });
  document
    .querySelector("#showreel .full_video")
    .addEventListener("click", () => {
      fullVideo();
    });
  document.querySelector("#showreel .cta").addEventListener("click", () => {
    CtaModal();
  });
}

function getPageContent() {
  console.log("getPageContent");
  fetch("/wordpress/wp-json/wp/v2/pages/6")
    .then(response => response.json())
    .then(myJson => {
      const pageContent = myJson;
      console.log(pageContent);
      InsertPageContent(pageContent);
    });
}

function InsertPageContent(pageContent) {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - Show reel - - - - - - - - - - -

  dest.querySelector("[data-show_reel_header]").textContent =
    pageContent.acf.show_reel_header;

  // - - - - - - - - - - - video - - - - - - - - - - -

  if (window.innerWidth < 500) {
    console.log("Small video");
    dest
      .querySelector("[data-show_reel_video]")
      .setAttribute("src", pageContent.acf.show_reel_video_small);
    dest
      .querySelector("[data-show_reel_full_video]")
      .setAttribute("src", pageContent.acf.show_reel_full_video_small);
  } else if (window.innerWidth >= 500 && window.innerWidth < 1200) {
    console.log("Medium video");
    dest
      .querySelector("[data-show_reel_video]")
      .setAttribute("src", pageContent.acf.show_reel_video_medium);
    dest
      .querySelector("[data-show_reel_full_video]")
      .setAttribute("src", pageContent.acf.show_reel_full_video_medium);
  } else {
    console.log("Large video");
    dest
      .querySelector("[data-show_reel_video]")
      .setAttribute("src", pageContent.acf.show_reel_video_large);
    dest
      .querySelector("[data-show_reel_full_video]")
      .setAttribute("src", pageContent.acf.show_reel_full_video_large);
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

  // - - - - - - - - - - - how section  - - - - - - - - - - -

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
}

// - - - - - - - - - - - get cases content  - - - - - - - - - - -

function getCaseContent() {
  console.log("getCaseContent");
  let caseArray = [];

  // get cases
  fetch("/wordpress/wp-json/wp/v2/case?per_page=100")
    .then(response => response.json())
    .then(myJson => {
      let getCases = myJson;
      //fix id
      getCases.forEach(caseItem => {
        caseItem.id = caseItem.slug;
      });
      caseArray = getCases;
      console.log(caseArray);
      caseArray.forEach(showCases);
    });
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
  clone.querySelector("[data-solution]").textContent = caseItem.acf.solution;
  clone.querySelector("[data-id]").addEventListener("click", () => {
    window.location.href = "case.html?id=" + caseItem.slug;
    window.sessionStorage.setItem("pageLink", caseItem.slug);
  });
  document.querySelector("[data-cases_container]").appendChild(clone);
}

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

  observer.observe(document.querySelector("#showreel .header"));
}

function fullVideo() {
  document.querySelector("#showreel #videomodal").classList.add("show");
  document.querySelector("#showreel #reel").pause();
  document.querySelector("#showreel #full").play();
  document.querySelector("html").classList.add("fixed");
  let elem = document.documentElement;
  console.log("requestFullscreen");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  document
    .querySelector("#showreel #videomodal .close")
    .addEventListener("click", closeModal);
  function closeModal() {
    console.log("closeModal");
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

function CtaModal() {
  document.querySelector("#cta_modal").classList.add("show");
  document.querySelector("#showreel #reel").pause();
  document.querySelector("html").classList.add("fixed");
  document
    .querySelector("#cta_modal .close")
    .addEventListener("click", closeCtaModal);
  function closeCtaModal() {
    console.log("closeCtaModal");
    document.querySelector("#showreel #reel").play();
    document
      .querySelector("#cta_modal .close")
      .removeEventListener("click", closeCtaModal);
    document.querySelector("#cta_modal").classList.remove("show");
    document.querySelector("html").classList.remove("fixed");
  }
}

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
let autoTurnTime = 5000;
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
        if (i < 5) {
          rotateTo(i, circleArray[i].id);
        } else {
          i = 0;
        }
        autoTurn();
      }
    }, autoTurnTime);
  } else {
    return;
  }
}

// test of IntersectionObserver for how-circle behavior

function mobileHowCircle() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        console.log("circle in");
        document.querySelector("#how .fixedholder").classList.add("active");
      } else {
        console.log("circle out");
        document.querySelector("#how .fixedholder").classList.remove("active");
      }
    });
  });

  observer.observe(document.querySelector("#how #discover_text"));
}

function casesScollEffect() {
  ScrollOut({
    targets: ".case",
    threshold: 0.8,
    once: false
  });
}

function logoSwap() {
  console.log("logoSwap");
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
    console.log("arrangeArrays");

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
    console.log(activeArray);
    console.log(hiddenArray);
    setTimeout(() => {
      swapShowSVG();
    }, 3000);
  }

  function swapShowSVG() {
    console.log("swapShowSVG");
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
        console.log("logo imported");
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
        console.log("logo imported");
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

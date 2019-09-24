"use strict";

let showreelButton = false;
let currantNumber = "0";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getPageContent();
  document.querySelector(".year").innerHTML = new Date().getFullYear();
  showreelCta();
  circleTurn();
  casesScollEffect();
  logoSwap();
  // if (window.innerWidth < 900) {
  //   mobileHowCircle();
  // }
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#roskilde_kommune").addEventListener("click", () => {
    window.location = "roskilde-kommune.html";
  });
  document.querySelector("#geopark_odsherred").addEventListener("click", () => {
    window.location = "geopark-odsherred.html";
  });
  document.querySelector("#ambu").addEventListener("click", () => {
    window.location = "ambu.html";
  });
  document.querySelector("#coop").addEventListener("click", () => {
    window.location = "coop.html";
  });
  document.querySelector("#novo_nordisk").addEventListener("click", () => {
    window.location = "novo-nordisk.html";
  });
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "index.html#intro";
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
  fetch("http://erik-crg.dk/purplescout/wordpress/wp-json/wp/v2/pages/6")
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

let target;
let turnId;

function circleTurn() {
  document.querySelector("#discover").addEventListener("click", () => {
    turnId = "discover";
    target = "0";
    turnCircle();
  });
  document.querySelector("#data").addEventListener("click", () => {
    turnId = "data";
    target = "1";
    turnCircle();
  });
  document.querySelector("#design").addEventListener("click", () => {
    turnId = "design";
    target = "2";
    turnCircle();
  });
  document.querySelector("#develop").addEventListener("click", () => {
    turnId = "develop";
    target = "3";
    turnCircle();
  });
  document.querySelector("#deliver").addEventListener("click", () => {
    turnId = "deliver";
    target = "4";
    turnCircle();
  });
  document.querySelector(".blt_discover").addEventListener("click", () => {
    turnId = "discover";
    target = "0";
    turnCircle();
  });
  document.querySelector(".blt_data").addEventListener("click", () => {
    turnId = "data";
    target = "1";
    turnCircle();
  });
  document.querySelector(".blt_design").addEventListener("click", () => {
    turnId = "design";
    target = "2";
    turnCircle();
  });
  document.querySelector(".blt_develop").addEventListener("click", () => {
    turnId = "develop";
    target = "3";
    turnCircle();
  });
  document.querySelector(".blt_deliver").addEventListener("click", () => {
    turnId = "deliver";
    target = "4";
    turnCircle();
  });

  function turnCircle() {
    rotateTo(target, turnId);
  }

  function rotateTo(number, id) {
    let roteateDeg = number * 72 + "deg";
    document.querySelector(
      ".orbit"
    ).style.transform = `rotateZ(-${roteateDeg})`;

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

  // get logos
  fetch("http://erik-crg.dk/purplescout/wordpress/wp-json/wp/v2/logo")
    .then(response => response.json())
    .then(myJson => {
      let getLogos = myJson;
      console.log("logos:");
      //fix id

      getLogos.forEach(logo => {
        logo.id =
          "id-" + logo.title.rendered.replace(/\s+/g, "-").toLowerCase();
      });

      logoArray = getLogos;
      console.log("logoArray at fetch");
      console.log(logoArray);
      arrangeArrays();
    });

  // const logoArray = [
  //   { id: "id-1", image: "img/logo/nasa.svg", company: "Nasa" },
  //   { id: "id-2", image: "img/logo/ambu.svg", company: "Ambu" },
  //   {
  //     id: "id-3",
  //     image: "img/logo/arbejdstilsynet.svg",
  //     company: "Arbejdstilsynet"
  //   },
  //   { id: "id-4", image: "img/logo/arla.svg", company: "Arla" },
  //   { id: "id-5", image: "img/logo/carlsberg.svg", company: "Carlsberg" },
  //   { id: "id-6", image: "img/logo/chr_hansen.svg", company: "Chr. Hansen" },
  //   { id: "id-7", image: "img/logo/coloplast.svg", company: "Coloplast" },
  //   { id: "id-8", image: "img/logo/coop.svg", company: "Coop" },
  //   { id: "id-9", image: "img/logo/dako.svg", company: "Dako" },
  //   { id: "id-10", image: "img/logo/danske_bank.svg", company: "Danske Bank" },
  //   {
  //     id: "id-11",
  //     image: "img/logo/dansk_industri.svg",
  //     company: "Dansk Industri"
  //   },
  //   {
  //     id: "id-12",
  //     image: "img/logo/danmarks_naturfredningsforening.svg",
  //     company: "Danmarks Naturfredningsforening"
  //   },
  //   { id: "id-13", image: "img/logo/dsv.svg", company: "DVS" },
  //   { id: "id-14", image: "img/logo/dtu.svg", company: "DTU" },
  //   { id: "id-15", image: "img/logo/gynzone.svg", company: "Gynzone" },
  //   { id: "id-16", image: "img/logo/kraft.svg", company: "Kraft" },
  //   { id: "id-17", image: "img/logo/danfoss.svg", company: "Danfoss" },
  //   {
  //     id: "id-18",
  //     image: "img/logo/louis_poulsen.svg",
  //     company: "Louis Poulsen"
  //   },
  //   { id: "id-19", image: "img/logo/lundbeck.svg", company: "Lundbeck" },
  //   { id: "id-20", image: "img/logo/novozymes.svg", company: "Novozymes" },
  //   { id: "id-21", image: "img/logo/novartis.svg", company: "Novartis" },
  //   { id: "id-22", image: "img/logo/phillips.svg", company: "Phillips" },
  //   {
  //     id: "id-23",
  //     image: "img/logo/region_syddanmark.svg",
  //     company: "Region Syddanmark"
  //   },
  //   {
  //     id: "id-24",
  //     image: "img/logo/ringsted_kommune.svg",
  //     company: "Ringsted Kommune"
  //   },
  //   {
  //     id: "id-25",
  //     image: "img/logo/roskilde_kommune.svg",
  //     company: "Roskilde Kommune"
  //   },
  //   { id: "id-26", image: "img/logo/seeland.svg", company: "Seeland" },
  //   {
  //     id: "id-27",
  //     image: "img/logo/tandlaegeforeningen.svg",
  //     company: "Tandlægeforeningen"
  //   },
  //   { id: "id-28", image: "img/logo/telia.svg", company: "Telia" },
  //   { id: "id-29", image: "img/logo/visma.svg", company: "Visma" },
  //   { id: "id-30", image: "img/logo/contura.svg", company: "Contura" },
  //   { id: "id-31", image: "img/logo/cowi.svg", company: "Cowi" },
  //   {
  //     id: "id-32",
  //     image: "img/logo/fisher_scientific.svg",
  //     company: "Fisher Scientific"
  //   },
  //   { id: "id-33", image: "img/logo/genmap.svg", company: "Genmap" },
  //   { id: "id-34", image: "img/logo/gn.svg", company: "GN" },
  //   { id: "id-35", image: "img/logo/isover.svg", company: "Isover" },
  //   {
  //     id: "id-36",
  //     image: "img/logo/oejenlaegeforeningen.svg",
  //     company: "Visma"
  //   },
  //   {
  //     id: "id-37",
  //     image: "img/logo/novo_nordisk.svg",
  //     company: "Novo Nordisk"
  //   },
  //   { id: "id-38", image: "img/logo/politi.svg", company: "Politi" },
  //   { id: "id-39", image: "img/logo/rockwool.svg", company: "Rockwool" },
  //   {
  //     id: "id-40",
  //     image: "img/logo/videncenter_for_allergi.svg",
  //     company: "Videncenter for allergi"
  //   },
  //   {
  //     id: "id-41",
  //     image: "img/logo/videncenter_for_arbejdsmiljoe.svg",
  //     company: "Videncenter for arbejdsmiljø"
  //   },
  //   {
  //     id: "id-42",
  //     image: "img/logo/gsk.svg",
  //     company: "GSK"
  //   }
  // ];

  // // possible random sort
  // logoArray.sort(function() {
  //   return 0.5 - Math.random();
  // });

  function arrangeArrays() {
    console.log("arrangeArrays");

    // visible logos - mobile or larger
    let showLogos;

    if (window.innerWidth < 700) {
      showLogos = 4;
    } else if (window.innerWidth < 1200) {
      showLogos = 6;
    } else {
      showLogos = 8;
    }

    // Divide logos to visible and hidden array
    let numberOfLogos = logoArray.length;
    let activeArray = logoArray.slice(0, showLogos);
    let hiddenArray = logoArray.slice(showLogos, numberOfLogos);
    //import svg to DOM
    activeArray.forEach(svgImportActive);
    // hiddenArray.forEach(svgImportHidden);
    console.log("activeArray:");
    console.log(activeArray);
    setTimeout(() => {
      // swapShowSVG();
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
    console.log(displayLogo.acf.logo_image);
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

// autorunCircle();

// function autorunCircle() {
//   console.log("autorunCircle");
//   let runitems = [
//     "discover",
//     "data",
//     "design",
//     "develop",
//     "deliver",
//     "return"
//   ];
//   runitems.forEach((id, i) => {
//     console.log(id);
//     console.log(i);
//     setTimeout(() => {
//       rotateTo(i, id);
//       if (id === "return") {
//         autorunCircle();
//       }
//     }, i * 1000);
//   });
// }

// function runCircle(number, id) {
//   console.log("runCircle");
//   rotateTo(number, id);
//   let timer;
//   clearTimeout(timer);
//   timer = setTimeout(autoTurn, 5000);
//   function autoTurn() {
//     if (number == "0") {
//       runCircle("1", "data");
//     }
//     if (number == "1") {
//       runCircle("2", "design");
//     }
//     if (number == "2") {
//       runCircle("3", "develop");
//     }
//     if (number == "3") {
//       runCircle("4", "deliver");
//     }
//     if (number == "4") {
//       runCircle("0", "discover");
//     }
//   }
// }

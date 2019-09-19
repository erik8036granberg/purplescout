"use strict";

let showreelButton = false;
let currantNumber = "0";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
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
    alert("CTA-showreel");
  });
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
  const logoArray = [
    { id: "id-1", image: "img/logo/nasa.svg", company: "Nasa" },
    { id: "id-2", image: "img/logo/ambu.svg", company: "Ambu" },
    {
      id: "id-3",
      image: "img/logo/arbejdstilsynet.svg",
      company: "Arbejdstilsynet"
    },
    { id: "id-4", image: "img/logo/arla.svg", company: "Arla" },
    { id: "id-5", image: "img/logo/carlsberg.svg", company: "Carlsberg" },
    { id: "id-6", image: "img/logo/chrhansen.svg", company: "Chr. Hansen" },
    { id: "id-7", image: "img/logo/coloplast.svg", company: "Coloplast" },
    { id: "id-8", image: "img/logo/coop.svg", company: "Coop" },
    { id: "id-9", image: "img/logo/company_9.svg", company: "company_9" },
    { id: "id-10", image: "img/logo/company_10.svg", company: "company_10" },
    { id: "id-11", image: "img/logo/company_11.svg", company: "company_11" },
    { id: "id-12", image: "img/logo/company_12.svg", company: "company_12" },
    { id: "id-13", image: "img/logo/company_13.svg", company: "company_13" },
    { id: "id-14", image: "img/logo/company_14.svg", company: "company_14" },
    { id: "id-15", image: "img/logo/company_15.svg", company: "company_15" },
    { id: "id-16", image: "img/logo/company_16.svg", company: "company_16" }
  ];
  // // possible random sort
  // logoArray.sort(function() {
  //   return 0.5 - Math.random();
  // });
  // visible logos - mobile or larger
  let showLogos;
  if (window.innerWidth < 700) {
    showLogos = 4;
  } else {
    showLogos = 8;
  }
  // Divide logos to visible and hidden array
  let numberOfLogos = logoArray.length;
  let activeArray = logoArray.slice(0, showLogos);
  let hiddenArray = logoArray.slice(showLogos, numberOfLogos);
  activeArray.forEach(displayLogos);
  swapShow();

  // display logos in DOM
  function displayLogos(logo) {
    const template = document.querySelector("[data-logo_template]").content;
    const clone = template.cloneNode(true);
    clone.querySelector("[data-logo]").setAttribute("id", logo.id);
    clone.querySelector("[data-logo]").setAttribute("src", logo.image);
    clone.querySelector("[data-logo]").setAttribute("alt", logo.company);
    document.querySelector("[data-logos]").appendChild(clone);
  }

  function swapShow() {
    // set a timer
    setTimeout(() => {
      // get a random id from the active array to pick a DOM element
      let random = Math.floor(Math.random() * showLogos);
      let randomLogo = activeArray[random];
      // remove from the active array
      activeArray.splice(random, 1);
      // disappear animation
      document.querySelector("#" + randomLogo.id).style.opacity = "0";
      // get the first item in the hidden array and delete it
      let newLogo = hiddenArray[0];
      hiddenArray.shift();
      // replace id & image path with with new logo
      setTimeout(() => {
        document
          .querySelector("#" + randomLogo.id)
          .setAttribute("id", newLogo.id);
        document
          .querySelector("#" + newLogo.id)
          .setAttribute("src", newLogo.image);
        document
          .querySelector("#" + newLogo.id)
          .setAttribute("alt", newLogo.company);

        document.querySelector("#" + newLogo.id).style.opacity = "0.3";
      }, 1000);
      // add new logo to active array and random logo to hidden array
      activeArray.push(newLogo);
      hiddenArray.push(randomLogo);
      swapShow();
    }, 5000);
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

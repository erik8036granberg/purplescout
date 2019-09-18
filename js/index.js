"use strict";

let showreelButton = false;

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

function circleTurn() {
  console.log("circleTurn");

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

  function rotateTo(number, id) {
    let roteateDeg = number * 72 + "deg";
    console.log(id);
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
    console.log(slideValue);
    document.querySelector(
      "#slider"
    ).style.transform = `translateY(${slideValue})`;
    const textFade = document.querySelectorAll("#how .placeholder");
    textFade.forEach(el => {
      el.classList.add("hide");
    });
    setTimeout(() => {
      console.log("#" + id + "_text");
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
    { id: "1", image: "img/logo/virksomhed_1.png" },
    { id: "2", image: "img/logo/virksomhed_2.png" },
    { id: "3", image: "img/logo/virksomhed_3.png" },
    { id: "4", image: "img/logo/virksomhed_4.png" },
    { id: "5", image: "img/logo/virksomhed_5.png" },
    { id: "6", image: "img/logo/virksomhed_6.png" },
    { id: "7", image: "img/logo/virksomhed_7.png" },
    { id: "8", image: "img/logo/virksomhed_8.png" },
    { id: "9", image: "img/logo/virksomhed_9.png" },
    { id: "10", image: "img/logo/virksomhed_10.png" },
    { id: "11", image: "img/logo/virksomhed_11.png" },
    { id: "12", image: "img/logo/virksomhed_12.png" },
    { id: "13", image: "img/logo/virksomhed_13.png" },
    { id: "14", image: "img/logo/virksomhed_14.png" },
    { id: "15", image: "img/logo/virksomhed_15.png" },
    { id: "16", image: "img/logo/virksomhed_16.png" }
  ];
  // possible random sort
  logoArray.sort(function() {
    return 0.5 - Math.random();
  });
  // Divide logos to visible and hidden
  let showLogos = 8;
  let numberOfLogos = logoArray.length;
  let activeArray = logoArray.slice(0, showLogos);
  let hiddenArray = logoArray.slice(showLogos, numberOfLogos);
  console.log(activeArray);
  console.log(hiddenArray);

  // generate images to DOM

  function swapShow() {
    // set a timer
    setTimeout(() => {
      //do stuff after 5 sec
    }, 5000);
    // get a random id from the active array to pick a DOM element
    // start disappear animation
    // replace id & image path with first item in the hidden array
    // Find and remove new item from the activ array and put it last in the hidden array
    // delete the moved item from the hidden array
    // start appear animation
    // Do it again!!
  }
}

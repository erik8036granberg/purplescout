"use strict";

let showreelButton = false;
let circleItem;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector(".year").innerHTML = new Date().getFullYear();
  showreelCta();
  circleTurn();
  // if (window.innerWidth < 900) {
  //   mobileHowCircle();
  // }
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#robotech").addEventListener("click", () => {
    window.location = "case.html?id=robotech";
  });
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "index.html#what";
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

function circleTurn() {
  console.log("circleTurn");

  document.querySelector("#discover").addEventListener("click", () => {
    rotateTo("0deg", "discover");
  });
  document.querySelector("#data").addEventListener("click", () => {
    rotateTo("72deg", "data");
  });
  document.querySelector("#design").addEventListener("click", () => {
    rotateTo("144deg", "design");
  });
  document.querySelector("#develop").addEventListener("click", () => {
    rotateTo("216deg", "develop");
  });
  document.querySelector("#deliver").addEventListener("click", () => {
    rotateTo("288deg", "deliver");
  });

  function rotateTo(roteateDeg, id) {
    circleItem = id;
    console.log(circleItem);
    document.querySelector(".orbit").style.transform = `rotateZ(${roteateDeg})`;

    const allItems = document.querySelectorAll(".item");
    allItems.forEach(el => {
      el.style.transform = `rotate(-${roteateDeg})`;
    });

    const removeActive = document.querySelectorAll(".active");
    removeActive.forEach(el => {
      el.classList.remove("active");
    });

    document.querySelector("#" + id).classList.add("active");
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

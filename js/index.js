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
    { id: "id-1", image: "img/logo/company_1.png", company: "company_1" },
    { id: "id-2", image: "img/logo/company_2.png", company: "company_2" },
    { id: "id-3", image: "img/logo/company_3.png", company: "company_3" },
    { id: "id-4", image: "img/logo/company_4.png", company: "company_4" },
    { id: "id-5", image: "img/logo/company_5.png", company: "company_5" },
    { id: "id-6", image: "img/logo/company_6.png", company: "company_6" },
    { id: "id-7", image: "img/logo/company_7.png", company: "company_7" },
    { id: "id-8", image: "img/logo/company_8.png", company: "company_8" },
    { id: "id-9", image: "img/logo/company_9.png", company: "company_9" },
    { id: "id-10", image: "img/logo/company_10.png", company: "company_10" },
    { id: "id-11", image: "img/logo/company_11.png", company: "company_11" },
    { id: "id-12", image: "img/logo/company_12.png", company: "company_12" },
    { id: "id-13", image: "img/logo/company_13.png", company: "company_13" },
    { id: "id-14", image: "img/logo/company_14.png", company: "company_14" },
    { id: "id-15", image: "img/logo/company_15.png", company: "company_15" },
    { id: "id-16", image: "img/logo/company_16.png", company: "company_16" }
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
  activeArray.forEach(displayLogos);

  // generate images to DOM
  function displayLogos(logo) {
    const template = document.querySelector("[data-logo_template]").content;
    const clone = template.cloneNode(true);
    clone.querySelector("[data-logo]").setAttribute("id", logo.id);
    clone.querySelector("[data-logo]").setAttribute("src", logo.image);
    clone.querySelector("[data-logo]").setAttribute("alt", logo.company);
    document.querySelector("[data-logos]").appendChild(clone);
    swapShow();
  }

  function swapShow() {
    // set a timer
    setTimeout(() => {
      console.log("time's up 1 sec");
      // get a random id from the active array to pick a DOM element
      let random = Math.floor(Math.random() * showLogos);
      let randomObject = activeArray[random];
      console.log(randomObject);
    }, 1000);
  }
}

function temp() {
  // set a timer
  setTimeout(() => {
    // get a random id from the active array to pick a DOM element
    let random_index = Math.floor(Math.random() * showLogos);
    let randomObject = activeArray[random_index];
    console.log(randomObject);

    let random_id = randomObject.id;
    let random_image = randomObject.image;
    console.log(randomObject);
    console.log(random_id);
    // start disappear animation
    document.querySelector("#" + random_id).classList.add(".logo_out");
    // get the first item in the hidden array and delete it
    let newLogo = hiddenArray.slice(0, 1);
    console.log(newLogo);
    hiddenArray.shift();
    console.log(hiddenArray);
    // replace id & image path with first item in the hidden array
    document.querySelector("#" + random_id).setAttribute("id", newLogo.id);

    // Find and remove new item from the activ array and put it last in the hidden array
    // delete the moved item from the hidden array
    // start appear animation
    // Do it again!!
  }, 5000);
}

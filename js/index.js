"use strict";

let showreelButton = false;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  visibleTest();
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "index.html#what";
  });
}

// function visibleTest() {
//   // Intersection Observer API
//   // https://usefulangle.com/post/113/javascript-detecting-element-visible-during-scroll

//   console.log("visibleTest");
//   var observer = new IntersectionObserver(
//     function(entries) {
//       if (entries[0].isIntersecting === true)
//         console.log("Page header is visible");
//     },
//     { threshold: [1] }
//   );

//   observer.observe(document.querySelector("#showreel .header"));
// }

function visibleTest() {
  let inview;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        inview = true;
        setTimeout(() => {
          if (inview == true && showreelButton != true) {
            console.log("Seen for 3 sec for the first time");
            showreelButton = true;
            document.querySelector("#showreel .cta").classList.add("appear");
          }
        }, 3000);
      } else {
        inview = false;
      }
    });
  });

  observer.observe(document.querySelector("#showreel .header"));
}

"use strict";

//	URL stuff
let urlParams = new URLSearchParams(window.location.search);
let urlCase = urlParams.get("id");
console.log("urlCase er: " + urlCase);
if (urlCase == undefined || urlCase === null) {
  window.location.href = "index.html";
}

let showreelButton = false;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  getPageContent();
  document.querySelector(".year").innerHTML = new Date().getFullYear();
  showreelCta();
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "index.html#showreel";
    if (mobileMenu === "open") {
      closeMenu();
    }
  });
  document.querySelector("#showreel .explore").addEventListener("click", () => {
    window.location = "case.html#case";
  });
}

function getPageContent() {
  console.log("getPageContent");
  fetch(
    `http://erik-crg.dk/purplescout/wordpress/wp-json/wp/v2/case?slug=${urlCase}`
  )
    .then(response => response.json())
    .then(myJson => {
      const pageContent = myJson[0];
      console.log("pageContent from URL-filter");
      console.log(pageContent);
      InsertPageContent(pageContent);
    });
}

function InsertPageContent(pageContent) {
  let dest = document.querySelector("[data-container]");

  // - - - - - - - - - - - video - - - - - - - - - - -

  if (window.innerWidth < 500) {
    console.log("Small video");
    dest
      .querySelector("[data-showreel_video]")
      .setAttribute("src", pageContent.acf.showreel_video_small);
  } else if (window.innerWidth >= 500 && window.innerWidth < 1200) {
    console.log("Medium video");
    dest
      .querySelector("[data-showreel_video]")
      .setAttribute("src", pageContent.acf.showreel_video_medium);
  } else {
    console.log("Large video");
    dest
      .querySelector("[data-showreel_video]")
      .setAttribute("src", pageContent.acf.showreel_video_large);
  }

  // - - - - - - - - - - - case header - - - - - - - - - - -

  dest.querySelector("[data-company]").textContent = pageContent.acf.company;
  dest.querySelector("[data-solution]").textContent = pageContent.acf.solution;

  // - - - - - - - - - - - main text - - - - - - - - - - -

  dest.querySelector("[data-main_text]").innerHTML = pageContent.acf.main_text;

  // - - - - - - - - - - - images - - - - - - - - - - -

  dest
    .querySelector("[data-image_1]")
    .setAttribute("src", pageContent.acf.image_1.sizes.medium_large);
  dest
    .querySelector("[data-image_1]")
    .setAttribute(
      "alt",
      pageContent.acf.solution + " for " + pageContent.acf.company
    );

  dest
    .querySelector("[data-image_2]")
    .setAttribute("src", pageContent.acf.image_2.sizes.medium_large);
  dest
    .querySelector("[data-image_2]")
    .setAttribute(
      "alt",
      pageContent.acf.solution + " for " + pageContent.acf.company
    );

  // - - - - - - - - - - - testimonial - - - - - - - - - - -

  if (pageContent.acf.testimonial_quote) {
    dest.querySelector("[data-testimonial_quote]").innerHTML =
      pageContent.acf.testimonial_quote;
  }
  if (pageContent.acf.testimonial_person) {
    dest.querySelector("[data-testimonial_person]").innerHTML =
      pageContent.acf.testimonial_person;
  }
  if (pageContent.acf.testimonial_company) {
    dest.querySelector("[data-testimonial_company]").innerHTML =
      pageContent.acf.testimonial_company;
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
}

// - - - - - - - - - - - Showreel CTA - - - - - - - - - - -

// TODO: modal code + correct CTA?

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
}

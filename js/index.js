"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("#logo").addEventListener("click", () => {
    window.location = "index.html#showreel";
  });
}

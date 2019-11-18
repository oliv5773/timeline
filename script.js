"use strict";

let svg = {};

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("running");
  //loadJSON();
  hentSVG();
}

async function hentSVG() {
  console.log("svg loaded");
  let url = "animerede_dinosaur/mother.svg";
  let svgData = await fetch(url);

  svg = await svgData.text();
  document.querySelector("#mother_placeholder").innerHTML = svg;
  document.querySelector("#mother_placeholder").style.display = "none";

  console.log(svg);
  showSVG();
}

function showSVG() {
  let placeholders = document.querySelectorAll(".media-wrapper");

  placeholders.forEach((placeholder, i) => {
    placeholder.append(document.querySelector(`#dino_${i + 1}`));

    //placeholder.innerHTML = `<svg viewBox="0 0 100 100"><use xlink:href="#dino_${i}"></use></svg>`;
  });
}

const elms = document.querySelectorAll(".element");

const config = {
  root: null, //document.querySelector('#some-element')
  rootMargin: "0px",
  threshold: [0, 0.25, 0.75, 1]
};

// observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.intersectionRatio > 0.75) {
//       entry.target.classList.add("visible");
//     } else {
//       entry.target.classList.remove("visible");
//     }
//   });
// }, config);

elms.forEach(elem => {
  observer.observe(elem);
});

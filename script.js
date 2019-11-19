"use strict";

let svg = {};
let dinoData = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("running");
  loadJSON();
  hentSVG();
  intObserver();
}

function loadJSON() {
  fetch("dino.json")
    .then(response => response.json())
    .then(jsonData => {
      dinoData = jsonData;
    });
}

async function hentSVG() {
  console.log("svg loaded");
  let url = "animerede_dinosaur/mother.svg";
  let svgData = await fetch(url);

  svg = await svgData.text();
  document.querySelector("#mother_placeholder").innerHTML = svg;
  document.querySelector("#mother_placeholder").style.display = "none";
  showSVG();
}

function showSVG() {
  let placeholders = document.querySelectorAll(".dino-svg");

  placeholders.forEach((placeholder, i) => {
    placeholder.append(document.querySelector(`.dino_${i + 1}`));

    //placeholder.innerHTML = `<svg viewBox="0 0 100 100"><use xlink:href="#dino_${i}"></use></svg>`;
  });
}

function intObserver() {
  const elms = document.querySelectorAll(".dino-svg, .intro");

  const config = {
    root: null, //document.querySelector('#some-element')
    rootMargin: "0px",
    threshold: [0, 0.25, 0.75]
  };

  let observer = new IntersectionObserver(entries => {
    let visibleCount = 0;
    // set visible counter to 0

    entries.forEach(entry => {
      console.log(entry);
      console.log(entry.target.classList.className);

      if (entry.intersectionRatio > 0.75) {
        entry.target.classList.add("visible");
        // count visible up!
        visibleCount++;
        //document.querySelector(".infobox").classList.add("visible");
        console.log("visible");
        let dinoID = parseInt(entry.target.dataset.id, 10);
        let dino = dinoData[dinoID - 1];
        document.querySelector(".info-name").textContent = dino.name;
        document.querySelector(".info-time").textContent = dino.time;
        document.querySelector(".info-desc").textContent = dino.description;
      } else {
        entry.target.classList.remove("visible");
        //document.querySelector(".infobox").classList.remove("visible");
        console.log("not visible");
      }
    });

    if (visibleCount > 0) {
      console.log(visibleCount);
      document.querySelector(".infobox").classList.add("visible");
    }

    // set infobox visible if visble counter > 0
  }, config);

  elms.forEach(elem => {
    observer.observe(elem);
  });
}

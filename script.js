"use strict";

let svg = {};
let simonEmil = {};
let dinoData = [];

window.addEventListener("DOMContentLoaded", init);

// Code to detect when scrolling has stopped from https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
let isScrolling;
window.addEventListener(
  "scroll",
  function(event) {
    document.querySelector("#simon_emil img").src = "animerede_dinosaur/simonemilwalking.svg";
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
      // Run the callback
      console.log("Scrolling has stopped.");
      document.querySelector("#simon_emil img").src = "animerede_dinosaur/simonemil.svg";
    }, 66);
  },
  false
);

function init() {
  console.log("running");
  loadJSON();
  getMotherSVG();
  intObserver();
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      console.log("button clicked");
      document.querySelector("audio").currentTime = 0;
      document.querySelector("audio").play();
    });
  });
}

function loadJSON() {
  fetch("dino.json")
    .then(response => response.json())
    .then(jsonData => {
      dinoData = jsonData;
    });
}

async function getMotherSVG() {
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
  });
}

function intObserver() {
  const elms = document.querySelectorAll(".dino-svg");

  const config = {
    root: null, //document.querySelector('#some-element')
    rootMargin: "0px",
    threshold: [0, 0.25, 0.75]
  };

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log(entry);

      if (entry.intersectionRatio > 0.75) {
        entry.target.classList.add("visible");

        let dinoID = parseInt(entry.target.dataset.id, 10);
        let dino = dinoData[dinoID - 1];

        document.querySelector(`.item${dinoID} .info-name`).textContent = dino.name;
        document.querySelector(`.item${dinoID} .info-time`).textContent = dino.time;
        document.querySelector(`.item${dinoID} .info-desc`).textContent = dino.description;
        document.querySelector("audio").src = `audio/${dino.audio}`;

        document.querySelector("#simon_emil").style.setProperty("--scale", dino.size);
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, config);

  elms.forEach(elem => {
    observer.observe(elem);
  });
}

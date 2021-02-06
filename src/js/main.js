import { init } from "./controller.js";
const exploreBtn = document.querySelector(".explorebtn");
const latestPostSection = document.querySelector(".latest__post__section");

exploreBtn.addEventListener("click", function () {
  latestPostSection.scrollIntoView({ behavior: "smooth" });
});

init();

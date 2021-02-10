import { init } from "./controller.js";
const exploreBtn = document.querySelector(".explorebtn");
const latestPostSection = document.querySelector(".latest__post__section");
const nav = document.querySelector(".nav-items");
const footer = document.querySelector(".footer");

exploreBtn.addEventListener("click", function () {
  latestPostSection.scrollIntoView({ behavior: "smooth" });
});

nav.addEventListener("click", function (e) {
  e.preventDefault();
  const link = e.target.closest(".link_nav-link");

  if (!link) return;

  const content = link.textContent;

  if (content === "About" || content === "Contact Us")
    footer.scrollIntoView({ behavior: "smooth" });
});

init();

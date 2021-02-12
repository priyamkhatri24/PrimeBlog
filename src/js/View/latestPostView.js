import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class LatestPosts {
  #parentEl = document.querySelector(".latest__post__section");
  #postContainer = document.querySelector(".list-post-latest");
  #popularPostContainer = document.querySelector(".popular_posts_list");
  #allLatestPostsBtn = document.querySelector(".see-all-latest-posts");

  renderMarkup(posts, users) {
    this.#postContainer.innerHTML = "";
    this.#postContainer.insertAdjacentHTML(
      "afterbegin",
      this.#generateMarkupLatest.call(this, posts, users)
    );
    this.#popularPostContainer.innerHTML = "";
    this.#popularPostContainer.insertAdjacentHTML(
      "afterbegin",
      this.#generateMarkupPopular.call(this, posts)
    );
  }

  renderSpinner() {
    const spinner = '<div class="loader">Loading...</div>';
    this.#clear();
    this.#postContainer.insertAdjacentHTML("afterbegin", spinner);
    this.#popularPostContainer.insertAdjacentHTML("afterbegin", spinner);
  }

  renderError() {
    this.#allLatestPostsBtn.classList.add("hidden");
    const error = ` <div class="error_msg"><p>Something went wrong. Please try again later ❗ </p></div>`;
    this.#clear();
    this.#postContainer.insertAdjacentHTML("afterbegin", error);
  }
  #clear() {
    this.#postContainer.innerHTML = "";
    this.#popularPostContainer.innerHTML = "";
  }

  #generateMarkupPopular(posts) {
    const latestPosts = posts.filter((ele, index) => {
      if (index % 10 === 0) return ele;
    });
    return latestPosts
      .slice(1, 4)
      .map((ele) => {
        return `
        <a class="to_display" href="#fullPost" data-postid=${ele.id}>
          <div class="list-post-popular">
          <h3>${ele.title}</h3>
          <p>L${ele.body}...</p>
          </div>
      </a>
          `;
      })
      .join("");
  }

  #generateMarkupLatest(posts, users) {
    const latestPosts = posts.filter((ele, index) => {
      if (index % 10 === 0) return ele;
    });
    return latestPosts
      .slice(0, 6)
      .map((ele, i) => {
        return `
        <a class="to_display" href="#fullPost" data-postid=${ele.id}>
            <div class="list-post">
            <img src=${back.default}>
            <h3>${ele.title
              .split(" ")
              .slice(0, 3)
              .join(" ")}<br><span style="font-size: 80%;">- ${
          users[i].name
        }</span></h3>
            <p>${ele.body.split(" ").slice(0, 4).join(" ")}...</p>
             </div>
        </a>
          `;
      })
      .join("");
  }

  allPostsClickHandler(handler) {
    this.#allLatestPostsBtn.addEventListener("click", function (e) {
      const btn = e.target.closest("a");

      if (!btn) return;

      handler();
      document.querySelector(".nav").scrollIntoView({ behavior: "auto" });
    });
  }

  displayFullPost(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      const postCard = e.target.closest(".to_display");

      if (!postCard) return;
      handler(postCard.dataset.postid);
      document.querySelector(".nav").scrollIntoView({ behavior: "auto" });
    });
  }
}

export default new LatestPosts();

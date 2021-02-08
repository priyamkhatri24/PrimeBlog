import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class LatestPosts {
  #parentEl = document.querySelector(".latest__post__section");
  #postContainer = document.querySelector(".list-post-latest");
  #popularPostContainer = document.querySelector(".popular_posts_list");

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
    this.#postContainer.innerHTML = "";
    this.#popularPostContainer.innerHTML = "";
    this.#postContainer.insertAdjacentHTML("afterbegin", spinner);
    this.#popularPostContainer.insertAdjacentHTML("afterbegin", spinner);
  }

  #generateMarkupPopular(posts) {
    const popularPosts = posts.filter((ele, index) => {
      if ((index - 1) % 10 === 0) return ele;
    });
    return popularPosts
      .slice(0, 3)
      .map((ele, i) => {
        return `
        <a href="#fullPost">
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
        <a href="#fullPost">
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
}

export default new LatestPosts();

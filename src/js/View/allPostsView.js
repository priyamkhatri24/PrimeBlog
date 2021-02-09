import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class AllPosts {
  #parentEl = document.querySelector(".all_posts_section");
  #postContainer = document.querySelector(".all_posts_list");

  renderMarkup(posts, users) {
    this.#postContainer.innerHTML = "";
    this.#changeView();
    this.#postContainer.insertAdjacentHTML(
      "afterbegin",
      this.#generteMarkup.call(this, posts, users)
    );
  }

  #changeView() {
    document.getElementById("home").classList.toggle("hidden");
    document.getElementById("allPosts").classList.toggle("hidden");
  }

  #generteMarkup(posts, users) {
    this.#shuffle(posts);
    return posts
      .map((ele, i) => {
        const currUser = users.find((user) => user.id === ele.userId);
        return `
        <a class="to_display" href="#fullPost" data-postid=${ele.id}>
            <div class="list-post">
            <img src=${back.default}>
            <h3>${ele.title
              .split(" ")
              .slice(0, 3)
              .join(" ")}<br><span style="font-size: 80%;">- ${
          currUser.name
        }</span></h3>
            <p>${ele.body.split(" ").slice(0, 4).join(" ")}...</p>
            </div>
        </a>
          `;
      })
      .join("");
  }

  #shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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

export default new AllPosts();

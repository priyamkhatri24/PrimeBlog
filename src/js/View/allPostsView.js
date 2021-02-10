import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class AllPosts {
  #parentEl = document.querySelector(".all_posts_section");
  #postContainer = document.querySelector(".all_posts_list");
  #alertMsg = "Something went wrong, please reload the page! ";

  renderMarkup(posts, users, currPage, lastPage) {
    this.#postContainer.innerHTML = "";
    this.#changeView();
    this.#postContainer.insertAdjacentHTML(
      "afterbegin",
      this.#generteMarkup.call(this, posts, users)
    );
    this.renderPaginationBtns(currPage, lastPage);
  }

  #changeView() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("allPosts").classList.remove("hidden");
  }

  #generteMarkup(posts, users) {
    // this.#shuffle(posts);
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

  renderPaginationBtns(currPage, lastPage) {
    let paginationBtn;

    if (currPage >= 1 || currPage < lastPage) {
      if (currPage === 1) {
        paginationBtn = `
        <div class="pagination">
        <button class="pag_btn prev_page btn_nodisplay" data-pagenumber=${
          currPage - 1
        }>
        <ion-icon name="arrow-back-outline"></ion-icon>
        Page ${currPage - 1}
        </button>
        <button class="pag_btn next_page" data-pagenumber=${currPage + 1}>
        Page ${currPage + 1}
        <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
        </div>
        `;
      }

      if (currPage > 1 && currPage < lastPage) {
        paginationBtn = `
        <div class="pagination">
        <button class="pag_btn prev_page" data-pagenumber=${currPage - 1}>
        <ion-icon name="arrow-back-outline"></ion-icon>
        Page ${currPage - 1}
        </button>
        <button class="pag_btn next_page" data-pagenumber=${currPage + 1}>
        Page ${currPage + 1}
        <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
        </div>
        `;
      }

      if (currPage === lastPage) {
        paginationBtn = `
        <div class="pagination">
        <button class="pag_btn prev_page" data-pagenumber=${currPage - 1}>
          <ion-icon name="arrow-back-outline"></ion-icon>
          Page ${currPage - 1}
        </button>
        <button class="pag_btn next_page btn_nodisplay" data-pagenumber=${
          currPage + 1
        }>
          Page ${currPage + 1}
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
        </div>
        `;
      }

      this.#postContainer.insertAdjacentHTML("beforeend", paginationBtn);
      this.#postContainer.insertAdjacentHTML("afterbegin", paginationBtn);
    } else return;
  }

  paginationFlowHandler(handler) {
    this.#postContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".pag_btn");
      if (!btn) return;

      handler(+btn.dataset.pagenumber);
      document.querySelector(".nav").scrollIntoView({ behavior: "smooth" });
    });
  }

  displayAlert() {
    alert(this.#alertMsg);
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

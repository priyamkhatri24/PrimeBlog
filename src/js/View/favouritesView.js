import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class Favourites {
  #dropdownEl = document.querySelector(".fav_dropdown");
  #favourites;

  updateFavourites(favourites) {
    this.#favourites = favourites;
  }

  renderFavourites() {
    this.#dropdownEl.innerHTML = "";
    this.#dropdownEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateFavMarkup.call(this)
    );
  }

  #generateFavMarkup(favourites = this.#favourites) {
    if (!favourites.length) {
      return `
          <div class="favourite_post_display">
        <h4>You dont't have any favourite posts right now. 😊</h4>
        <!-- <p>- Author Name</p> -->
      </div>`;
    }
    return favourites
      .map((ele) => {
        return `
        <div class="favourite_post_display" data-postid=${ele.id}>
            <h3>${ele.title}</h3>
            <p>${ele.body.split(" ").slice(0, 5).join(" ")}...</p>
         </div>
          `;
      })
      .join("");
  }

  displayFullPost(handler) {
    this.#dropdownEl.addEventListener("click", function (e) {
      const postCard = e.target.closest(".favourite_post_display");

      if (!postCard) return;
      if (postCard.dataset.postid) {
        handler(postCard.dataset.postid);
        document.querySelector(".nav").scrollIntoView({ behavior: "auto" });
      }
    });
  }
}

export default new Favourites();

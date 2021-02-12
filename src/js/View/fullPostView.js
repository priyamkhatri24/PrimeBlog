import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class FullPost {
  #parentEl = document.querySelector(".full_post_section");
  #favBtnEl = document.querySelector(".display__add_to_fav");
  #fullPostEl = document.querySelector(".full_post_view_section");
  #alertMsg = "Something went wrong, please reload the page! ";
  #currPost;

  renderMarkup(posts, users, comments, postId) {
    this.#fullPostEl.innerHTML = "";
    this.#favBtnEl.innerHTML = "";
    this.#fullPostEl.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup.call(this, posts, users, postId, comments)
    );
    this.#favBtnEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateFavBtnMarkup()
    );
    this.#changeView();
  }

  #changeView() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("allPosts").classList.add("hidden");
    document.getElementById("fullPost").classList.remove("hidden");
  }

  #generateFavBtnMarkup() {
    return `
    <div class="add-to-fav">
      <button class="add-to-fav-text fav_btn fav_active"><p>${
        this.#currPost.isFavourite ? "Added" : "Add"
      } to Favourite</p>
          <ion-icon name=${
            this.#currPost.isFavourite ? "heart" : "heart-outline"
          } class="heart-icon"></ion-icon>
      </button>
    </div>
    `;
  }

  #generateMarkup(posts, users, postId, comments) {
    this.#currPost = posts.find((ele) => ele.id === +postId);
    const currUser = users.find((ele) => ele.id === this.#currPost.userId);
    return `
    
<section>
    <div class="post-content">
        <div class="title">
            <h2>${this.#currPost.title.split(" ").slice(0, 4).join(" ")}</h2>
            <p class="date">September 5, 2021</p>
        </div>
        <div class="author">
            <h3 class="author-name">Author: ${currUser.name}</h3>
        </div>
        <div class="content">
            <p>${this.#currPost.body.repeat(5)}
                <p>${this.#currPost.body.repeat(8)}</p>
                <p>${this.#currPost.body.repeat(5)}</p>
            </p>
        </div>
    </div> 
</section>


<section class="comment-sec">
     <div class="comment-section">
        <h2 class="comment-heading">5 Comments</h2>
        ${this.#generateComments(comments)}
    </div> 
</section>
      `;
  }

  #generateComments(comments, currentPost = this.#currPost) {
    const commentsArr = comments.filter((ele) => ele.postId === currentPost.id);
    return commentsArr
      .map((ele) => {
        return `
        <div class="comment">
          <div class="comment_display">
            <ion-icon class="comment_user_icon" name="person-circle-outline"></ion-icon>
            <div>
              <h4>${ele.name.split(" ").slice(0, 2).join(" ")}</h4>
              <p class="mail">${ele.email}</p>
            </div>
          </div>
          <p class="comment-text">${ele.body}</p>
          <hr>
        </div>
        `;
      })
      .join("");
  }

  renderFavBtnMarkup() {
    this.#favBtnEl.innerHTML = "";
    this.#favBtnEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateFavBtnMarkup()
    );
  }

  favouritePostsHandler(handler) {
    this.#favBtnEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".fav_btn");

      if (btn) {
        handler();
      }
    });
  }

  goToHome() {
    this.#parentEl.addEventListener("click", function (e) {
      const home = e.target.closest(".btn__go_to_home");
      if (!home) return;
      if (home) {
        document.getElementById("home").classList.remove("hidden");
        document.getElementById("fullPost").classList.add("hidden");
      }
    });
  }

  displayAlert() {
    alert(this.#alertMsg);
  }
}

export default new FullPost();

import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class FullPost {
  #parentEl = document.querySelector(".full_post_section");
  #alertMsg = "Something went wrong, please reload the page! ";

  renderMarkup(posts, users, comments, postId) {
    this.#parentEl.innerHTML = "";
    this.#parentEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateMarkup.call(this, posts, users, postId, comments)
    );
    this.#changeView();
  }

  #changeView() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("allPosts").classList.add("hidden");
    document.getElementById("fullPost").classList.remove("hidden");
  }

  #generateMarkup(posts, users, postId, comments) {
    const currentPost = posts.find((ele) => ele.id === +postId);
    const currUser = users.find((ele) => ele.id === currentPost.userId);
    // console.log(currUser);
    return `
    <section>
    <div class="add-to-fav">
        <a href="#" class="add-to-fav-text"><p>Add to Favourite</p>
        <ion-icon name="heart-outline" class="heart-icon"></ion-icon></a>
    </div>
</section>   


<section>
    <div class="post-content">
        <div class="title">
            <h2>${currentPost.title.split(" ").slice(0, 4).join(" ")}</h2>
            <p class="date">September 5, 2020</p>
        </div>
        <div class="author">
            <h3 class="author-name">Author: ${currUser.name}</h3>
        </div>
        <div class="content">
            <p>${currentPost.body.repeat(5)}
                <p>${currentPost.body.repeat(8)}</p>
                <p>${currentPost.body.repeat(5)}</p>
            </p>
        </div>
    </div> 
</section>


<section class="comment-sec">
     <div class="comment-section">
        <h2 class="comment-heading">5 Comments</h2>
        ${this.#generateComments(comments, currentPost)}
    </div> 
</section>
      `;
  }

  #generateComments(comments, currentPost) {
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

  displayAlert() {
    alert(this.#alertMsg);
  }
}

export default new FullPost();

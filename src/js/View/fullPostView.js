import "core-js/stable";
import * as back from "../../css/blogpost.jpg";

class FullPost {
  #parentEl = document.querySelector(".full_post_section");

  renderMarkup(posts, users, postId) {
    this.#parentEl.innerHTML = "";
    this.#parentEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateMarkup.call(this, posts, users, postId)
    );
    this.#changeView();
  }

  #changeView() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("allPosts").classList.add("hidden");
    document.getElementById("fullPost").classList.remove("hidden");
  }

  #generateMarkup(posts, users, postId) {
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
        <div class="comment">
            <h4>Name</h4>
            <p class="mail">name@gmail.com</p>
            <p class="comment-text">adipisci iusto totam placeat corrupti ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas deserunt beatae adipisci iusto totam placeat corruptiadipisci iusto totam placeat corrupti ipsumLorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas deserunt beatae adipisci iusto totam placeat corrupti</p>
        </div>
    </div> 
</section>
      `;
  }
}

export default new FullPost();

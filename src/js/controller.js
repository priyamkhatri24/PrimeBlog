import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import LatestPosts from "./View/latestPostView.js";
import AllPosts from "./View/allPostsView.js";
import FullPost from "./View/fullPostView.js";

const controlPosts = async function () {
  try {
    LatestPosts.renderSpinner();
    const posts = await model.loadPostsData();
    const users = await model.loadUsersData();
    LatestPosts.renderMarkup(model.state.posts, model.state.users);
  } catch (err) {
    LatestPosts.renderError();
  }
};

const controlAllPosts = async function (postId) {
  try {
    AllPosts.renderMarkup(model.state.posts, model.state.users, postId);
  } catch (err) {
    console.log(err);
  }
};

const controlFullPost = async function (postId) {
  try {
    FullPost.renderMarkup(model.state.posts, model.state.users, postId);
  } catch (err) {
    console.log(err);
  }
};

export const init = function () {
  controlPosts();
  LatestPosts.allPostsClickHandler(controlAllPosts);
  LatestPosts.displayFullPost(controlFullPost);
  AllPosts.displayFullPost(controlFullPost);
};

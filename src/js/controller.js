import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import LatestPosts from "./View/latestPostView.js";

const controlPosts = async function () {
  LatestPosts.renderSpinner();
  const posts = await model.loadPostsData();
  const users = await model.loadUsersData();
  console.log(posts, users);
  LatestPosts.renderMarkup(posts, users);
};

export const init = function () {
  controlPosts();
};

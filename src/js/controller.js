import "core-js/stable";
import * as model from "./model.js";

const controlPosts = async function () {
  model.loadPostsData();
  model.loadUsersData();
  model.loadCommentsData();
};

export const init = function () {
  controlPosts();
};

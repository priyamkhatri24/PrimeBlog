import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import LatestPosts from "./View/latestPostView.js";
import AllPosts from "./View/allPostsView.js";
import FullPost from "./View/fullPostView.js";

const controlLoadingPosts = async function () {
  try {
    LatestPosts.renderSpinner();
    await model.loadPostsData();
    await model.loadUsersData();
    await model.loadCommentsData();
    LatestPosts.renderMarkup(model.state.posts, model.state.users);
    model.state.favourites.forEach((ele) => (ele.isFavourite = true));
  } catch (err) {
    LatestPosts.renderError();
  }
};

const controlAllPosts = async function () {
  try {
    model.createPagination();
    AllPosts.renderMarkup(
      model.state.perPagePosts,
      model.state.users,
      model.state.currPage
    );
  } catch (err) {
    // AllPosts.displayAlert();
    console.log(err);
  }
};

const controlPagination = function (currPage, postId) {
  model.state.currPage = currPage;
  const lastPage = Math.ceil(
    model.state.posts.length / model.state.postsPerPage
  );
  model.createPagination();
  AllPosts.renderMarkup(
    model.state.perPagePosts,
    model.state.users,
    model.state.currPage,
    lastPage
  );
};

const controlFullPost = async function (postId) {
  try {
    FullPost.renderMarkup(
      model.state.posts,
      model.state.users,
      model.state.comments,
      postId
    );
  } catch (err) {
    FullPost.displayAlert();
  }
};

export const init = function () {
  controlLoadingPosts();
  LatestPosts.allPostsClickHandler(controlAllPosts);
  LatestPosts.displayFullPost(controlFullPost);
  AllPosts.displayFullPost(controlFullPost);
  AllPosts.paginationFlowHandler(controlPagination);
};

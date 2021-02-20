import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import LatestPosts from "./View/latestPostView.js";
import AllPosts from "./View/allPostsView.js";
import FullPost from "./View/fullPostView.js";
import Favourites from "./View/favouritesView.js";

const controlLoadingPosts = async function () {
  try {
    LatestPosts.renderSpinner();
    await model.loadPostsData();
    await model.loadUsersData();
    await model.loadCommentsData();
    model.getDataFromLocalStorage();
    Favourites.updateFavourites(model.state.favourites);
    Favourites.renderFavourites();
    LatestPosts.renderMarkup(model.state.posts, model.state.users);
  } catch (err) {
    LatestPosts.renderError();
    // console.log(err);
  }
};

const controlAllPosts = async function () {
  try {
    model.createPagination();
    const lastPage = Math.ceil(
      model.state.posts.length / model.state.postsPerPage
    );
    AllPosts.renderMarkup(
      model.state.perPagePosts,
      model.state.users,
      model.state.currPage,
      lastPage
    );
  } catch (err) {
    AllPosts.displayAlert();
  }
};

const controlPagination = function (currPage) {
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
    model.state.currPost = model.state.posts.find((ele) => ele.id === +postId);
    FullPost.renderFavBtnMarkup();
  } catch (err) {
    FullPost.displayAlert();
  }
};

const controlFavPost = function () {
  if (!model.state.currPost.isFavourite) {
    model.addFavPost(model.state.currPost);
  } else {
    model.removeFavPost(model.state.currPost);
  }
  FullPost.renderFavBtnMarkup();
  Favourites.updateFavourites(model.state.favourites);
  Favourites.renderFavourites();
  model.saveDataToLocalStorage(model.state.favourites);
};

export const init = function () {
  controlLoadingPosts();
  LatestPosts.allPostsClickHandler(controlAllPosts);
  LatestPosts.displayFullPost(controlFullPost);
  AllPosts.displayFullPost(controlFullPost);
  Favourites.displayFullPost(controlFullPost);
  AllPosts.paginationFlowHandler(controlPagination);
  FullPost.favouritePostsHandler(controlFavPost);
  FullPost.goToHome();
};

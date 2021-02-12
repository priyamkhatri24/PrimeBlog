import "core-js/stable";
import "regenerator-runtime/runtime";
import { getJSON } from "./helper.js";
import { API_URL_COMMENTS, API_URL_USERS, API_URL_POSTS } from "./config.js";

export const state = {
  posts: [],
  users: [],
  comments: [],
  postsPerPage: 16,
  currPage: 1,
  perPagePosts: [],
  currPost: {},
  favourites: [],
};

export const loadPostsData = async function () {
  try {
    const postData = await getJSON(API_URL_POSTS);
    state.posts = postData;
    return postData;
  } catch (err) {
    throw new Error(err);
  }
};
export const loadCommentsData = async function () {
  try {
    const commentsData = await getJSON(API_URL_COMMENTS);
    state.comments = commentsData;
    return commentsData;
  } catch (err) {
    throw new Error(err);
  }
};
export const loadUsersData = async function () {
  try {
    const usersData = await getJSON(API_URL_USERS);
    state.users = usersData;
    return usersData;
  } catch (err) {
    throw new Error(err);
  }
};

export const createPagination = function (page = state.currPage) {
  const start = (page - 1) * state.postsPerPage;
  const end = page * state.postsPerPage;
  state.perPagePosts = state.posts.slice(start, end);
};

export const addFavPost = function (currPost) {
  state.favourites.push(currPost);

  currPost.isFavourite = true;
};

export const removeFavPost = function (currPost) {
  const index = state.favourites.findIndex((ele) => ele.id === currPost.id);
  state.favourites.splice(index, 1);
  currPost.isFavourite = false;
};

export const saveDataToLocalStorage = function (favourites) {
  localStorage.setItem("favourites", JSON.stringify(favourites));

  persistFavouritePosts();
};

export const getDataFromLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("favourites"));

  if (data) state.favourites = data;

  persistFavouritePosts();
};

const persistFavouritePosts = function () {
  state.posts.forEach((ele) => {
    state.favourites.forEach((fav) => {
      if (fav.id === ele.id) ele.isFavourite = true;
    });
  });
};

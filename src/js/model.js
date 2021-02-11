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

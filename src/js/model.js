import "core-js/stable";
import "regenerator-runtime/runtime";
import { getJSON } from "./helper.js";
import { API_URL_COMMENTS, API_URL_USERS, API_URL_POSTS } from "./config.js";

export const loadPostsData = async function () {
  try {
    const postData = await getJSON(API_URL_POSTS);
    console.log(postData);
  } catch (err) {
    throw new Error(err);
  }
};
export const loadCommentsData = async function () {
  try {
    const postData = await getJSON(API_URL_COMMENTS);
    console.log(postData);
  } catch (err) {
    throw new Error(err);
  }
};
export const loadUsersData = async function () {
  try {
    const postData = await getJSON(API_URL_USERS);
    console.log(postData);
  } catch (err) {
    throw new Error(err);
  }
};

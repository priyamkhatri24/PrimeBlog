import "core-js/stable";
import "regenerator-runtime/runtime";

export const getJSON = async function (url) {
  try {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err);
  }
};

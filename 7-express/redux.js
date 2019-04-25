"use strict";
const { createStore } = require("redux");

const initialState = {};

let store = createStore(webCacheReducer);

function webCacheReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, [action.payload.key]: action.payload.value };
    case "REPLACE":
      return action.payload;
    case "DELETE":
      return { ...state, [action.payload.key]: undefined };
    case "CLEAR":
      return {};
    default:
      return state;
  }
}
module.exports = store;

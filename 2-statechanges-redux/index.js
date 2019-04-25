"use strict";
const { createStore } = require("redux");

const initialState = {
  amountOfCoffeeLeft: 0
};

let store = createStore(coffeeMugReducer);

(async function run() {
  store.subscribe(stateHasChanged);
  console.log("Grabbing a cup of coffee! :D");
  store.dispatch({ type: "GET_NEW_COFFEE" });
})();

function coffeeMugReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_NEW_COFFEE":
      return { amountOfCoffeeLeft: 250 };
    case "SIP_COFFEE": {
      let newAmount = state.amountOfCoffeeLeft - 10;
      if (newAmount <= 0) {
        newAmount = 0;
      }
      return { amountOfCoffeeLeft: newAmount };
    }
    default:
      return state;
  }
}

function stateHasChanged() {
  const state = store.getState();
  if (state.amountOfCoffeeLeft > 0) {
    console.log(`Mmmm Coffee, only ${state.amountOfCoffeeLeft}ml left`);
    store.dispatch({ type: "SIP_COFFEE" });
  } else {
    console.log("Coffee is finished :(");
  }
}

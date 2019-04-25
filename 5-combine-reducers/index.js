"use strict";
const { createStore, combineReducers } = require("redux");

const initialCoffeeMugState = {
  amountOfCoffeeLeft: 0
};

const initialRuskStateState = {
  hasBeenNomed: false,
  hasBeenDunked: false
};

let store = createStore(
  combineReducers({ coffee: coffeeMugReducer, rusk: ruskReducer })
);

(async function run() {
  store.subscribe(stateHasChanged);
  console.log("Grabbing a cup of coffee! :D");
  store.dispatch({ type: "GET_NEW_COFFEE" });
})();

function coffeeMugReducer(state = initialCoffeeMugState, action) {
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

function ruskReducer(state = initialRuskStateState, action) {
  switch (action.type) {
    case "DUNK_RUSK": {
      if (!state.hasBeenNomed) {
        const newState = { ...state, hasBeenDunked: true };
        return newState;
      }
      return state;
    }
    case "NOM_RUSK": {
      return { ...state, hasBeenNomed: true };
    }
    default:
      return state;
  }
}

function stateHasChanged() {
  const state = store.getState();
  if (!state.rusk.hasBeenNomed && state.coffee.amountOfCoffeeLeft > 100) {
    if (state.rusk.hasBeenDunked) {
      console.log("Rusk is ready to NOMED!");
      store.dispatch({ type: "NOM_RUSK" });
    } else {
      console.log("Rusk dunking time!!");
      store.dispatch({ type: "DUNK_RUSK" });
    }
    return;
  }
  if (state.coffee.amountOfCoffeeLeft > 0) {
    console.log(`Mmmm Coffee, only ${state.coffee.amountOfCoffeeLeft}ml left`);
    store.dispatch({ type: "SIP_COFFEE" });
  } else {
    console.log("Coffee is finished and I have soggy rusk crumbs in my mug :(");
  }
}

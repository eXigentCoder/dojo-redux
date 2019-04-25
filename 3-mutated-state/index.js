"use strict";
const { createStore } = require("redux");

const initialState = {
  amountOfCoffeeLeft: 0
};

let store = createStore(coffeeMugNOTReducer);

(async function run() {
  store.subscribe(stateHasChanged);
  console.log("Grabbing a cup of coffee! :D");
  store.dispatch({ type: "GET_NEW_COFFEE" });
})();

/** NOT A REAL REDUCER, DONT DO THIS
 * While this works fine in our simple example, some other libraries that use redux (Like react) will not detect the change and the virtual DOM will be wrong
 */
function coffeeMugNOTReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_NEW_COFFEE":
      state.amountOfCoffeeLeft = 250;
    case "SIP_COFFEE": {
      state.amountOfCoffeeLeft = state.amountOfCoffeeLeft - 10;
      if (state.amountOfCoffeeLeft <= 0) {
        state.amountOfCoffeeLeft = 0;
      }
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

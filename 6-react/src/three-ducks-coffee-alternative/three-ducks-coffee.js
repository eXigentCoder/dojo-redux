/** See https://github.com/erikras/ducks-modular-redux for more */

const ACTION_PREPEND = "my-app/coffee-alt/";

// Actions
const GET_NEW_COFFEE = `${ACTION_PREPEND}GET_NEW_COFFEE`;
const SIP_COFFEE = `${ACTION_PREPEND}SIP_COFFEE`;

// Initial State
const initialState = {
  amountOfCoffeeLeft: 0,
  canGetMoreCoffee: true,
  canSipCoffee: false
};

// Reducer
function coffeeMugReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_COFFEE:
      return {
        amountOfCoffeeLeft: 250,
        canGetMoreCoffee: false,
        canSipCoffee: true
      };
    case SIP_COFFEE: {
      let newAmount = state.amountOfCoffeeLeft - action.payload.sipAmount;
      if (newAmount <= 0) {
        newAmount = 0;
      }
      return {
        amountOfCoffeeLeft: newAmount,
        canGetMoreCoffee: newAmount === 0,
        canSipCoffee: newAmount > 0
      };
    }
    default:
      return state;
  }
}

// Action Creators
function getNewCoffee() {
  return { type: GET_NEW_COFFEE };
}

function sipCoffee(sipAmount) {
  return { type: SIP_COFFEE, payload: { sipAmount } };
}

//selectors

function getViewState(state) {
  return {
    amountOfCoffeeLeft: state.amountOfCoffeeLeft,
    canGetMoreCoffee: state.canGetMoreCoffee,
    canSipCoffee: state.canSipCoffee
  };
}

const actions = { getNewCoffee, sipCoffee };
const reducers = { coffeeMugReducer };
const selectors = { getViewState };

export default { actions, reducers, selectors };

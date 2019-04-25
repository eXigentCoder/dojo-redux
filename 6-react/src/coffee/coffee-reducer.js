const initialState = {
  amountOfCoffeeLeft: 0,
  canGetMoreCoffee: true,
  canSipCoffee: false
};

export default function coffeeMugReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_NEW_COFFEE":
      return {
        amountOfCoffeeLeft: 250,
        canGetMoreCoffee: false,
        canSipCoffee: true
      };
    case "SIP_COFFEE": {
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

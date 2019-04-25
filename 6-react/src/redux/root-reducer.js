import { combineReducers } from "redux";
import coffeeReducer from "../coffee/coffee-reducer";
import threeDucksCoffee from "../three-ducks-coffee/three-ducks-coffee";
import duck from "../three-ducks-coffee-alternative/three-ducks-coffee";
export default combineReducers({
  coffee: coffeeReducer,
  threeDucksCoffee,
  threeDucksCoffeeAlternative: duck.reducers.coffeeMugReducer
});

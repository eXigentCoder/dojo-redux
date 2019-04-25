import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Coffee from "./coffee/connected-coffee";
import ThreeDucksCoffee from "./three-ducks-coffee/connected-three-ducks-coffee";
import ThreeDucksCoffeeAlternative from "./three-ducks-coffee-alternative/connected-three-ducks-coffee";
function App() {
  return (
    <Provider store={store}>
      <Coffee />
      <hr />
      <ThreeDucksCoffee />
      <hr />
      <ThreeDucksCoffeeAlternative />
    </Provider>
  );
}

export default App;

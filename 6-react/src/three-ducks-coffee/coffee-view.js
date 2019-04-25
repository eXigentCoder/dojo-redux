import * as React from "react";

export default function({
  amountOfCoffeeLeft,
  canGetMoreCoffee,
  canSipCoffee,
  getCoffee,
  sipCoffee
}) {
  return (
    <main>
      <h1>Coffee Tracker - Three Ducks</h1>
      <p>There is currently {amountOfCoffeeLeft}ml of coffee left</p>
      <div>
        <input id="duckSipSize" type="number" />
      </div>
      <button
        onClick={() => sipCoffee(document.getElementById("duckSipSize").value)}
        disabled={!canSipCoffee}
      >
        Sip Coffee
      </button>
      <button onClick={getCoffee} disabled={!canGetMoreCoffee}>
        Get Coffee
      </button>
    </main>
  );
}

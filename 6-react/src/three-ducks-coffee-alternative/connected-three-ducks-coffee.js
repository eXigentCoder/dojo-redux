import Coffee from "./coffee-view";
import { connect } from "react-redux";
import duck from "./three-ducks-coffee";
// console.error(asd);
const { actions, selectors } = duck;
// console.error({ actions, selectors });
function mapStateToProps(state) {
  return selectors.getViewState(state.threeDucksCoffeeAlternative);
}

const mapDispatchToProps = {
  getCoffee: () => actions.getNewCoffee(),
  sipCoffee: sipAmount => actions.sipCoffee(sipAmount)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coffee);

import Coffee from "./coffee-view";
import { connect } from "react-redux";
import { getNewCoffee, sipCoffee } from "./three-ducks-coffee";
function mapStateToProps(state) {
  return state.threeDucksCoffee;
}
const mapDispatchToProps = {
  getCoffee: () => getNewCoffee(),
  sipCoffee: sipAmount => sipCoffee(sipAmount)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coffee);

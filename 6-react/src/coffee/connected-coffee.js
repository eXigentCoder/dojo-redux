import Coffee from "./coffee";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return state.coffee;
}
const mapDispatchToProps = {
  getCoffee: () => ({ type: "GET_NEW_COFFEE" }),
  sipCoffee: sipAmount => ({ type: "SIP_COFFEE", payload: { sipAmount } })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coffee);

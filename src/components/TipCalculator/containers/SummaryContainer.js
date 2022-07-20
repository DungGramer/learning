import { connect } from "react-redux";
import { Summary } from "../components/Summary";

const mapStateToProps = (state) => {
  const { items } = state;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tipAmount = subtotal * (state.tipPercentage / 100);
  const total = subtotal + tipAmount;

  return {
    subtotal,
    tipAmount,
    total
  }
}

export const SummaryContainer = connect(mapStateToProps)(Summary);
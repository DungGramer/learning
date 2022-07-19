import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    subTotal: state.summary.subTotal,
    tipAmount: state.summary.tipAmount,
    total: state.summary.total,
  }
}

export const SummaryContainer = connect(mapStateToProps)(Summary);
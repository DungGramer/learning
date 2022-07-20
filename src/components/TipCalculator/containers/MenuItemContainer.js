import { connect } from 'react-redux';
import MenuItem from '../components/MenuItem';
import { removeItem, updatePrice } from '../store/items/actions';

const mapDispatchToProps = (dispatch, ownGroups) => {
  return {
    // remove: (uuid) => dispatch(removeItem(uuid)),
    remove: () => dispatch(removeItem(ownGroups.uuid)),
    updatePrice: (price) => dispatch(updatePrice(ownGroups.uuid, price)),
  };
};

const mapStateToProps = (state, ownGroups) => {
  const total = ownGroups.quantity * ownGroups.price;

  return {
    total,
  }
}

export const MenuItemContainer = connect(mapStateToProps, mapDispatchToProps)(MenuItem);

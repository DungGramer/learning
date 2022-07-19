import { connect } from 'react-redux';
import MenuItem from '../components/MenuItem';
import { removeItem, updatePrice, updateQuantity } from '../store/items/actions';

const mapDispatchToProps = (dispatch, ownGroups) => {
  return {
    // remove: (uuid) => dispatch(removeItem(uuid)),
    remove: () => dispatch(removeItem(ownGroups.uuid)),
    updatePrice: (price) => dispatch(updatePrice(ownGroups.uuid, price)),
    updateQuantity: (quantity) => dispatch(updateQuantity(ownGroups.uuid, quantity))
  };
};

export const MenuItemContainer = connect(null, mapDispatchToProps)(MenuItem);

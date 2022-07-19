import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NewItemForm } from '../components/NewItemForm';
import { addNewItem } from '../store/items/actions';

// const mapDispatchToProps = (dispatch) => {
  // return bindActionCreators({
  //   onSubmit: (name, price) => dispatch(addNewItem(name, price))
  // }, dispatch);

//   return {
//     onSubmit: (name, price) => dispatch(addNewItem(name, price)),
//   }
// };

// Nếu dùng Object thì không cần dispatch vì tự nó map sang được

const mapDispatchToProps = {
  onSubmit: (name, price) => dispatch(addNewItem(name, price)),
}


export const NewItemFormContainer = connect(
  null,
  mapDispatchToProps
)(NewItemForm);

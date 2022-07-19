import { Card } from '@twilio-paste/core';
import { TipSelectContainer } from './containers/TipSelectContainer';

import { Summary } from './components/Summary';
import { MenuItemsContainer } from './containers/MenuItemsContainer';
import { NewItemFormContainer } from './containers/NewItemFormContainer';

export const Calculator = () => {
  return (
    <Card>
      <NewItemFormContainer />
      <MenuItemsContainer />
      {/* <TipSelectContainer /> */}
      {/* <Summary /> */}
    </Card>
  );
};

import { Card } from '@twilio-paste/core';
import { TipSelectContainer } from './containers/TipSelectContainer';

import { MenuItems } from './components/MenuItems';
import { NewItemForm } from './components/NewItemForm';
import { Summary } from './components/Summary';
import { MenuItemsContainer } from './containers/MenuItemsContainer';

export const Calculator = () => {
  return (
    <Card>
      <NewItemForm />
      <MenuItemsContainer />
      <TipSelectContainer />
      <Summary />
    </Card>
  );
};

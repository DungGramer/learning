import { Card } from '@twilio-paste/core';
import { TipSelectContainer } from './containers/TipSelectContainer';

import { MenuItems } from './components/MenuItems';
import { NewItemForm } from './components/NewItemForm';
import { Summary } from './components/Summary';

const items = [
  { uuid: 1, name: 'Tofu Roast', price: 14, quantity: 1 },
  { uuid: 2, name: 'Vegan Ham', price: 12, quantity: 1 },
];

export const Calculator = () => {
  return (
    <Card>
      <NewItemForm />
      <MenuItems items={items} />
      <TipSelectContainer />
      <Summary />
    </Card>
  );
};

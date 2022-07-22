import { Flex } from '@twilio-paste/flex';
import { AllHumans } from './components/AllHumans';
import { AllTasks } from './components/AllTasks';

const Application = () => {
  return (
    <Flex margin="auto" width="600">
      <AllHumans />
      <AllTasks />
    </Flex>
  );
};

export default Application;

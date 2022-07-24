import { Card, Heading, Text } from '@twilio-paste/core';

export const Fact = ({ fact }) => {
  return (
    <Card className="dog-fact">
      <Heading variant="heading30" as="h3">
        Dog Fact
      </Heading>
      <Text>{fact}</Text>
    </Card>
  );
};

import * as React from 'react';

import { Box } from '@twilio-paste/box';
import { Stack } from '@twilio-paste/stack';

import { useSelector } from 'react-redux';
import { DogFactForm } from './DogFactForm';
import { Fact } from './Fact';
import { Loading } from './Loading';

const Application = () => {
  const facts = useSelector((state) => state.facts);

  return (
    <Box>
      <DogFactForm />
      <Loading />
      <Stack orientation="vertical" spacing="space60">
        {facts.map((fact, index) => (
          <Fact key={index} fact={fact.fact} />
        ))}
      </Stack>
    </Box>
  );
};

export default Application;

import { Box, Button, Flex, Input, Label } from '@twilio-paste/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDogFactsFromApi } from '../store/factsSlice';

export const DogFactForm = () => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchDogFactsFromApi(value));
  };

  return (
    <Box marginBottom="space80">
      <form onSubmit={handleSubmit}>
        <Flex>
          <Box width="100%">
            <Label htmlFor="number-of-facts">Number of Dog Facts</Label>
            <Input
              type="text"
              value={value.toString()}
              min="1"
              max="10"
              onChange={(event) => setValue(+event.target.value)}
              id="number-of-facts"
            />
          </Box>
        </Flex>
        <Box marginY="space40">
          <Button onClick={handleSubmit} fullWidth>
            Fetch
          </Button>
        </Box>
      </form>
    </Box>
  );
};

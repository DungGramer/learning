import { Box, Text } from '@twilio-paste/core';

export const Loading = () => {
  return (
    <Box
      border="1px solid red"
      padding="1em"
      backgroundColor="#FFFF00"
      marginBottom="space60"
    >
      <Text as="span">Loading…</Text>
    </Box>
  );
};

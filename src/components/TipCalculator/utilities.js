import format from 'format-number';

const formatAsCurrency = format({ prefix: '$', truncate: 2, padRight: 2 });

export const toCurrency = (number) => {
  if (!number) {
    number = 0;
  }

  return formatAsCurrency(number);
};

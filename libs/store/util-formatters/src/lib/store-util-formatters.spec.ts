import { formatRating } from './store-util-formatters';

describe('storeUtilFormattersWorkspace', () => {
  it('should work', () => {
    expect(formatRating(1)).toEqual(
      'store-util-formatters-workspace'
    );
  });
});

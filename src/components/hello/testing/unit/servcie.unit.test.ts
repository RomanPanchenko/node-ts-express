import * as service from '../../service';

describe('hello service', () => {
  describe('getHello function', () => {
    it('returns the user-name value from the query object', async () => {
      const query = { 'user-name': 'John Doe' };
      const result = await service.getHello(query);
      expect(result).toBe('John Doe');
    });
  });
});

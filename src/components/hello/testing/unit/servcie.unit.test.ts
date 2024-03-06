import * as service from '../../service';

describe('hello service', () => {
  describe('getHello function', () => {
    it('returns the user-name value from the query object', async () => {
      const name = 'John Doe';
      const query = { 'user-name': name };
      const result = await service.getHello(query);
      expect(result).toBe(`Hello ${name}!`);
    });
  });
});

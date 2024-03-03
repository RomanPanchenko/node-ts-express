import { Server } from 'http';
import request from 'supertest';
import { default as app } from '../../../../app';
import { getErrorMessage } from '../../../../lib/test/get-error-message';

jest.mock('../../service');
import * as service from '../../service';

const DEFAULT_TEST_TIMEOUT = 10000;

let server: Server;

describe('Controller hello', ()=>{
  beforeAll(async () => {
    server = await app.serverPromise as Server;
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /hello with valid name', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should respond with "Hello John!"', async () => {
      jest.spyOn(service, 'getHello').mockImplementation(async () => 'John');

      const response = await request(server)
        .get('/hello?user-name=John')
        .expect('Content-Type', /text/)
        .expect(200);

      expect(service.getHello).toHaveBeenCalledWith({ 'user-name': 'John' });
      expect(service.getHello).toHaveBeenCalledTimes(1);
      expect(response.text).toEqual('Hello John!');
    }, DEFAULT_TEST_TIMEOUT);
  });

  describe('GET /hello with invalid name', () => {
    it('should respond with validation error for invalid value', async () => {
      const response = await request(server)
        .get('/hello?user-name=1John')
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response).toHaveProperty('error');
      expect(typeof response.error).toBe('object');
      const errObj = getErrorMessage(response);
      expect(errObj.message).toEqual('Validation error: "user-name" with value "1John" fails to match the required pattern: /^[A-Z][a-z]{1,9}$/');
    }, DEFAULT_TEST_TIMEOUT);

    it('should respond with validation error for empty value', async () => {
      const response = await request(server)
        .get('/hello')
        .expect('Content-Type', /application\/json/)
        .expect(400);

      expect(response).toHaveProperty('error');
      expect(typeof response.error).toBe('object');
      const errObj = getErrorMessage(response);
      expect(errObj.message).toEqual('Validation error: "user-name" is required');
    }, DEFAULT_TEST_TIMEOUT);
  });
});
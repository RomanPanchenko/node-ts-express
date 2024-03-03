import request from 'supertest';
import { App } from 'supertest/types';
import { default as app } from '../../../../app';
import { getErrorMessage } from '../../../../lib/test/get-error-message';

jest.mock('../../service');
import * as service from '../../service';

const DEFAULT_TEST_TIMEOUT = 10000;

describe.only('GET /hello with valid name', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should respond with "Hello John!"', async () => {
    jest.spyOn(service, 'getHello').mockImplementation(async () => 'John');
    const server = await app.serverPromise as App;

    const response = await request(server)
      .get('/hello?user-name=John')
      .expect('Content-Type', /text/)
      .expect(200);

    expect(service.getHello).toHaveBeenCalledWith({ 'user-name': 'John' });
    expect(service.getHello).toHaveBeenCalledTimes(1);
    expect(response.text).toEqual('Hello John!');
  }, DEFAULT_TEST_TIMEOUT);
});

describe.only('GET /hello with invalid name', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  it('should respond with validation error for invalid value', async () => {
    const server = await app.serverPromise as App;
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
    const server = await app.serverPromise as App;
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
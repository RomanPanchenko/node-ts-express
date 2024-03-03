import request from 'supertest';
import { App } from 'supertest/types';
import { default as app } from '../../../../app';
import { getErrorMessage } from '../../../../lib/test/get-error-message';

describe('GET /hello with valid name', () => {
  it('should respond "Hello John!"', async () => {
    const server = await app.serverPromise as App;
    const response = await request(server)
      .get('/hello?user-name=John')
      .expect('Content-Type', /text/)
      .expect(200);

    expect(response.text).toEqual('Hello John!');
  });
});

describe('GET /hello with invalid name', () => {
  it('should respond validation error', async () => {
    const server = await app.serverPromise as App;
    const response = await request(server)
      .get('/hello?user-name=1John')
      .expect('Content-Type', /application\/json/)
      .expect(400);

    expect(response).toHaveProperty('error');
    expect(typeof response.error).toBe('object');
    const errObj = getErrorMessage(response);
    expect(errObj.message).toEqual('Validation error: "user-name" with value "1John" fails to match the required pattern: /^[A-Z][a-z]{1,9}$/');
  });

  it('should respond validation error', async () => {
    const server = await app.serverPromise as App;
    const response = await request(server)
      .get('/hello')
      .expect('Content-Type', /application\/json/)
      .expect(400);

    expect(response).toHaveProperty('error');
    expect(typeof response.error).toBe('object');
    const errObj = getErrorMessage(response);
    expect(errObj.message).toEqual('Validation error: "user-name" is required');
  });
});
import { Request, Response } from 'express';
import * as controller from '../../controller';
import * as service from '../../service';
import { ValidationError } from '../../../../lib/errors';

jest.mock('../../service', () => ({
  getHello: jest.fn(),
}));

describe('Controller hello', () => {
  describe('Method getHello', () => {
    const mockResponse = (): Partial<Response> => ({
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    });

    const mockRequest = (query: any): Partial<Request> => ({
      query,
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return 200 and a greeting message for valid query', async () => {
      const req = mockRequest({ 'user-name': 'Alice' }) as Request;
      const res = mockResponse() as Response;

      (service.getHello as jest.Mock).mockResolvedValue('Alice');

      await controller.getHello(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Hello Alice!');
      expect(service.getHello).toHaveBeenCalledWith({ 'user-name': 'Alice' });
    });

    it('should throw ValidationError for invalid value', async () => {
      const req = mockRequest({ 'user-name': 'A' }) as Request;
      const res = mockResponse() as Response;

      try {
        await controller.getHello(req, res);
      } catch (error: unknown) {
        expect(error instanceof ValidationError).toBe(true);
        expect((error as ValidationError).message).toBe('Validation error: "user-name" with value "A" fails to match the required pattern: /^[A-Z][a-z]{1,9}$/');
      }

      expect(res.send).not.toHaveBeenCalled();
      expect(service.getHello).not.toHaveBeenCalled();
    });

    it('should throw ValidationError for empty value', async () => {
      const req = mockRequest({ 'user-name': '' }) as Request;
      const res = mockResponse() as Response;

      try {
        await controller.getHello(req, res);
      } catch (error: unknown) {
        expect(error instanceof ValidationError).toBe(true);
        expect((error as ValidationError).message).toBe('Validation error: "user-name" is not allowed to be empty');
      }

      expect(res.send).not.toHaveBeenCalled();
      expect(service.getHello).not.toHaveBeenCalled();
    });
  });
});

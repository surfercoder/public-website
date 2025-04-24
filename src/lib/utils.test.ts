import { cn, fromErrorToActionState, toActionState } from './utils';
import { z } from 'zod';

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
      expect(cn(['class1', 'class2'])).toBe('class1 class2');
    });
  });

  describe('fromErrorToActionState', () => {
    it('should handle ZodError correctly', () => {
      const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
      });
      
      const result = schema.safeParse({ name: 'a', email: 'invalid-email' });
      if (!result.success) {
        const actionState = fromErrorToActionState(result.error);
        expect(actionState.fieldErrors).toBeTruthy();
        expect(Object.keys(actionState.fieldErrors).length).toBeGreaterThan(0);
        expect(actionState.message).toBe('');
      }
    });

    it('should handle regular Error', () => {
      const error = new Error('Test error message');
      const actionState = fromErrorToActionState(error);
      
      expect(actionState.fieldErrors).toEqual({});
      expect(actionState.message).toBe('Test error message');
    });

    it('should handle unknown error', () => {
      const actionState = fromErrorToActionState('unknown error');
      
      expect(actionState.fieldErrors).toEqual({});
      expect(actionState.message).toBe('An unknown error occurred');
    });
  });

  describe('toActionState', () => {
    it('should create action state with message', () => {
      const message = 'Test message';
      const actionState = toActionState(message);
      
      expect(actionState.fieldErrors).toEqual({});
      expect(actionState.message).toBe(message);
    });
  });
});
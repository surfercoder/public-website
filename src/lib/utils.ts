import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ActionState = {
  fieldErrors: Record<string, string[] | undefined>;
  message: string;
};

export const EMPTY_ACTION_STATE: ActionState = {
  fieldErrors: {},
  message: '',
};

export const fromErrorToActionState = (error: unknown): ActionState => {
  if (error instanceof ZodError) {
    return {
      fieldErrors: error.flatten().fieldErrors,
      message: '',
    };
  } else if (error instanceof Error) {
    return {
      fieldErrors: {},
      message: error.message,
    };
  } else {
    return {
      fieldErrors: {},
      message: 'An unknown error occurred',
    };
  }
};

export const toActionState = (message: string): ActionState => ({
  fieldErrors: {},
  message,
});
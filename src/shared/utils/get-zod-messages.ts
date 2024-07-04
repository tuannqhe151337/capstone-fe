import { ZodError } from "zod";

export const getZodMessasges = (
  parseFn: Function
): string | null | undefined => {
  try {
    parseFn();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return error.errors.map((e) => e.message).join(", ");
    }

    return "Validation failed.";
  }
};

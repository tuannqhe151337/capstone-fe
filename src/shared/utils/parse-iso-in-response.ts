import { parseISO } from "date-fns";

export const parseISOInResponse = (dateStr: string): Date => {
  try {
    return parseISO(dateStr, { additionalDigits: 2 });
  } catch (_) {
    return new Date();
  }
};

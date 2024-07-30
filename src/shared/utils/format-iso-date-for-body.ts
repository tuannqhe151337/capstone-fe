export const formatISODateForBody = (date: Date): string => {
  return date.toISOString().replace("Z", "");
};

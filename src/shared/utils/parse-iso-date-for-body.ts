export const parseISODateForBody = (date: Date): string => {
    return date.toISOString().replace("Z", "");
}
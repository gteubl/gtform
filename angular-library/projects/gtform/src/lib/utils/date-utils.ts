export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export function convertDateToString(date: Date, dateOnly: boolean = false): string {

  if (dateOnly) {
    return date.toISOString().split('T')[0];
  }
  return date.toISOString();
}

export function isDateBefore(date: Date, otherDate: Date): boolean {
  return date < otherDate;
}

export function isDateAfter(date: Date, otherDate: Date): boolean {
  return date > otherDate;
}

export function isDateEqual(date: Date, otherDate: Date): boolean {
  return date.getTime() === otherDate.getTime();
}

export function isDateBetween(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

export function isDateBeforeOrEqual(date: Date, otherDate: Date): boolean {
  return date <= otherDate;
}

export function isDateAfterOrEqual(date: Date, otherDate: Date): boolean {
  return date >= otherDate;
}

export function isDateBetweenOrEqual(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

export function isDateValid(date: Date): boolean {
  return !isNaN(date.getTime());
}

export function isDateValidString(date: string): boolean {
  return isDateValid(new Date(date));
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}


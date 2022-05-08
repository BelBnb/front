export const diffInTime = (beginDate: Date, endDate: Date): number => beginDate.getTime() - endDate.getTime();
export const diffInDays = (beginDate: Date, endDate: Date): number =>
  (diffInTime(beginDate, endDate) / (1000 * 3600 * 24)) * -1 + 1;

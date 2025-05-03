export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatPeriod = (startDate: string, endDate: string | null): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
};

export const calculateDuration = (startDate: string, endDate: string | null): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  let totalMonths = years * 12 + months;
  if (totalMonths < 0) {
    totalMonths = 0;
  }

  const yearsResult = Math.floor(totalMonths / 12);
  const monthsResult = totalMonths % 12;

  if (yearsResult === 0) {
    return `${monthsResult} ${monthsResult === 1 ? 'month' : 'months'}`;
  }

  if (monthsResult === 0) {
    return `${yearsResult} ${yearsResult === 1 ? 'year' : 'years'}`;
  }

  return `${yearsResult} ${yearsResult === 1 ? 'year' : 'years'} ${monthsResult} ${monthsResult === 1 ? 'month' : 'months'}`;
};
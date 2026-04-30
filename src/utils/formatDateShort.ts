export const formatDateShort = (value?: string) => {
  if (!value) return '';

  const date = new Date(value);

  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');

  const month = date.toLocaleString('en-GB', {
    month: 'short',
  });

  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
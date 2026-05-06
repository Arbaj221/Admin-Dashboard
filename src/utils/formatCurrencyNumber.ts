export const formatCurrencyNumber = (value?: number | string) => {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};
export const getCurrencySymbol = (currency?: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "INR":
      return "₹";
    case "EUR":
      return "€";
    default:
      return ""; // ✅ safe fallback
  }
};
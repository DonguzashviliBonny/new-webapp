export const formatAmountToString = (amount: string, decimalLimit?: number): string => {
  if (amount.trim() === "") return "";

  // Handle the case where the amount is "0"
  if (amount === "0") return "0";

  // delete commas if exist
  amount = formatReplaceComma(amount);
  const reg = /^(\d+(\.\d*)?|\.\d+)?$/;

  // test if we have incorrect character just delete it and make recursion for format
  if (!reg.test(amount)) return formatAmountToString(amount.slice(0, amount.length - 1));

  // Remove leading zeros from the amount
  amount = amount.replace(/^0+(?=\d)/, "");

  const decimalIndex = amount.indexOf(".");

  // If the amount has decimal places
  if (decimalIndex !== -1) {
    // Handle the decimal limit if provided
    if (decimalLimit !== undefined) {
      const decimalPlaces = amount.length - decimalIndex - 1;

      // Trim the decimal places if they exceed the decimal limit
      if (decimalPlaces > decimalLimit) {
        const limitedDecimalPart = amount.substring(decimalIndex + 1, decimalIndex + 1 + decimalLimit);
        amount = `${amount.substring(0, decimalIndex)}.${limitedDecimalPart}`;
      }
    }

    // Format the integer part with commas
    const integerPart = formatWithCommas(amount.substring(0, decimalIndex));
    const decimalPart = amount.substring(decimalIndex + 1);

    return `${integerPart}.${decimalPart}`.trim();
  }

  // If the amount has no decimal places, just format the integer part
  return formatWithCommas(amount).trim();
};

// Helper function to format numbers with commas
const formatWithCommas = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatLargeNumber = (value: number, decimal: number = 3): string | undefined => {
  if (value === undefined || value === null) return undefined;

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toFixed(decimal);
};

export const toFixedNoRound = (num: number, decimalPlaces: number) =>
  Math.trunc(num * 10 ** decimalPlaces) / 10 ** decimalPlaces;

export const getFormattedUnhiddenAmount = (value: string) => {
  if (Number.isInteger(Number(value))) {
    return formatNumberWithCommas(Number(Number(value)));
  } else if (Number(value) > 1) {
    return formatNumberWithCommas(Number(Number(value).toFixed(2)));
  } else return Number(value).toFixed(4);
};

export const formatNumberWithCommas = (number: number) => {
  // Check if the number is an integer (whole)
  if (Number.isInteger(number)) {
    return number.toLocaleString();
  }

  const decimalPlaces = number.toString().split(".")[1]?.length || 0;

  // Format the number based on its decimal places
  return number.toLocaleString(undefined, {
    minimumFractionDigits: Math.min(decimalPlaces, 2),
    maximumFractionDigits: 2,
  });
};

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}.${month}.${day}`;
};

export const formatReplaceComma = (amount: string) => {
  return amount.replace(/,/g, "");
};

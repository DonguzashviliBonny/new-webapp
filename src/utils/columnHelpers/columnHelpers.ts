export const getStatusTextColor = (status: string | undefined) => {
  if (status === "Completed") {
    return "success";
  } else if (status === "Failed") {
    return "error";
  } else return "warning";
};

export const getRoundedAmount = (amount: number) => {
  if (Number.isInteger(amount) || !amount) {
    return amount;
  } else if (amount > 1) {
    return amount.toFixed(2);
  } else return amount.toFixed(4);
};
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

export const getStatusBackgroundColor = (status: string | undefined) => {
  if (status === "Completed") {
    return "success10";
  } else if (status === "Failed") {
    return "fail10";
  } else {
    return "nordOrange10";
  }
};

export const formatString = (inputString: string, breakPoint?: number) => {
  const firstPart = inputString.slice(0, breakPoint);
  const middlePart = "...";
  const lastPart = inputString.slice(-4);

  return firstPart + middlePart + lastPart;
};

export const formatZerosToChar = (value: number) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  } else {
    return value;
  }
};

export const hideWithMask = (value: string, mobile?: boolean) => {
  if (value.length > 16) {
    const firstPart = mobile ? "**** **** " : "**** **** **** ";
    const lastPart = value.slice(-4);
    return firstPart + lastPart;
  } else {
    return value;
  }
};

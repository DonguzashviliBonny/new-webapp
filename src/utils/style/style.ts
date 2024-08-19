export const getCSSVarValue = (value: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--nord-${value}`);
};

export const calculateLastRowAndColumn = (index: number, length: number, numOfColumns: number) => {
  const isLastRow = index >= length - (length % numOfColumns || numOfColumns);
  const isLastInColumn = (index + 1) % numOfColumns !== 0 || (length % numOfColumns !== 0 && index + 1 === length);

  return { isLastRow, isLastInColumn };
};

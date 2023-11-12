export const calculateHealthScoreForAMonth = (
  income: number,
  expenses: number,
  debt: number,
  assets: number
): number => {
  const netIncome = income - expenses;
  const debtToEquity = debt / assets;
  const currentRatio = assets / debt;
  const returnOnAssets = netIncome / assets;
  let score = 0;

  if (netIncome > 0) {
    score++;
  }

  if (debtToEquity < 1) {
    score++;
  }

  if (currentRatio > 1) {
    score++;
  }

  if (returnOnAssets > 0.1) {
    score++;
  }
  return score;
};

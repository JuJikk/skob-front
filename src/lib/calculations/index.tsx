import { Step } from "../../types/accordion.ts"

export const calculateCompletionPercentage = (proba: Step): number => {
  const allTasks = Object.values(proba.checked).flat();
  const totalCompletedTasks = allTasks.reduce((acc, task) => acc + task, 0);
  const overallPercentage = (totalCompletedTasks / allTasks.length) * 100;

  return parseFloat(overallPercentage.toFixed(2));
};
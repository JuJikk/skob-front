
import { Step } from "../../types/accordion";

export const useCompletionPercentages = (steps: Step[]): number[] => {
    return steps.map((step) => {
      const allTasks = Object.values(step.checked).flat();
      const totalCompletedTasks = allTasks.reduce((acc, task) => acc + task, 0);
      const overallPercentage = (totalCompletedTasks / allTasks.length) * 100;
      return parseFloat(overallPercentage.toFixed(2));
    });
};

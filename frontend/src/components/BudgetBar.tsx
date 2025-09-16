import { clsx } from 'clsx';

interface BudgetBarProps {
  totalSpent: number;
  budgetCap: number;
}

export default function BudgetBar({ totalSpent, budgetCap }: BudgetBarProps) {
  const remainingBudget = budgetCap - totalSpent;
  const spentPercentage = (totalSpent / budgetCap) * 100;

  const isOverBudget = totalSpent > budgetCap;
  const isNearLimit = spentPercentage > 90;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-f1-dark">Budget Tracker</h3>
        <div className="text-right">
          <div className={clsx(
            'text-lg font-bold',
            isOverBudget ? 'text-red-600' : 'text-f1-dark'
          )}>
            ${totalSpent.toFixed(1)}M / ${budgetCap}M
          </div>
          <div className={clsx(
            'text-sm',
            isOverBudget ? 'text-red-600' : remainingBudget < 5 ? 'text-orange-600' : 'text-gray-600'
          )}>
            {isOverBudget ? `$${Math.abs(remainingBudget).toFixed(1)}M over budget` : `$${remainingBudget.toFixed(1)}M remaining`}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={clsx(
              'h-3 rounded-full transition-all duration-300',
              isOverBudget ? 'bg-red-500' : isNearLimit ? 'bg-orange-500' : 'bg-f1-red'
            )}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>

        {isOverBudget && (
          <div className="mt-2 text-sm text-red-600 font-medium">
            ⚠️ Over budget! Remove players to continue.
          </div>
        )}

        {!isOverBudget && isNearLimit && (
          <div className="mt-2 text-sm text-orange-600 font-medium">
            ⚡ Close to budget limit
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-600">Budget Cap</div>
          <div className="font-semibold text-f1-dark">${budgetCap}M</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Spent</div>
          <div className="font-semibold text-f1-dark">${totalSpent.toFixed(1)}M</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Remaining</div>
          <div className={clsx(
            'font-semibold',
            isOverBudget ? 'text-red-600' : 'text-f1-dark'
          )}>
            ${remainingBudget.toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
}
import type { OptimizationCriteria } from '../types/fantasy';
import { clsx } from 'clsx';
import { Zap, TrendingUp, DollarSign, Target } from 'lucide-react';

interface CriteriaSelectorProps {
  criteria: OptimizationCriteria;
  onChange: (criteria: OptimizationCriteria) => void;
}

export default function CriteriaSelector({ criteria, onChange }: CriteriaSelectorProps) {
  const criteriaOptions = [
    {
      type: 'next-race' as const,
      label: 'Next Race Points',
      description: 'Optimize for maximum points in the upcoming race',
      icon: Zap,
    },
    {
      type: 'next-3-races' as const,
      label: 'Next 3 Races',
      description: 'Balance performance across the next 3 race weekends',
      icon: TrendingUp,
    },
    {
      type: 'budget-growth' as const,
      label: 'Budget Growth',
      description: 'Focus on price increases and long-term value',
      icon: DollarSign,
    },
    {
      type: 'balanced' as const,
      label: 'Balanced Strategy',
      description: 'Mix of short-term points and budget efficiency',
      icon: Target,
    },
  ];

  const riskOptions = [
    { value: 'conservative' as const, label: 'Conservative', description: 'Safe picks, lower variance' },
    { value: 'moderate' as const, label: 'Moderate', description: 'Balanced risk/reward' },
    { value: 'aggressive' as const, label: 'Aggressive', description: 'High risk, high reward' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-f1-dark mb-4">Optimization Strategy</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">Strategy Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criteriaOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = criteria.type === option.type;

              return (
                <button
                  key={option.type}
                  onClick={() => onChange({ ...criteria, type: option.type })}
                  className={clsx(
                    'p-4 rounded-lg border-2 text-left transition-all',
                    isSelected
                      ? 'border-f1-red bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      size={20}
                      className={clsx(
                        'mt-1',
                        isSelected ? 'text-f1-red' : 'text-gray-600'
                      )}
                    />
                    <div className="flex-1">
                      <div className={clsx(
                        'font-medium',
                        isSelected ? 'text-f1-red' : 'text-f1-dark'
                      )}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">Risk Tolerance</label>
          <div className="flex space-x-2">
            {riskOptions.map((option) => {
              const isSelected = criteria.riskTolerance === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => onChange({ ...criteria, riskTolerance: option.value })}
                  className={clsx(
                    'flex-1 p-3 rounded-lg border-2 text-center transition-all',
                    isSelected
                      ? 'border-f1-red bg-red-50 text-f1-red'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  )}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs mt-1 opacity-75">{option.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
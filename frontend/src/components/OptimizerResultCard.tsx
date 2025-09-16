import type { OptimizedLineup } from '../types/fantasy';
import { TrendingUp, TrendingDown, Minus, ArrowRightLeft } from 'lucide-react';
import { clsx } from 'clsx';

interface OptimizerResultCardProps {
  lineup: OptimizedLineup;
  rank: number;
}

export default function OptimizerResultCard({ lineup, rank }: OptimizerResultCardProps) {
  const pointsDelta = lineup.pointsDelta;
  const isPositive = pointsDelta > 0;
  const isNeutral = pointsDelta === 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span className="bg-f1-red text-white text-sm font-bold px-2 py-1 rounded">
            #{rank}
          </span>
          <h3 className="text-lg font-semibold text-f1-dark">Optimized Lineup</h3>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp size={16} className="text-green-600" />
            ) : isNeutral ? (
              <Minus size={16} className="text-gray-500" />
            ) : (
              <TrendingDown size={16} className="text-red-600" />
            )}
            <span className={clsx(
              'font-bold',
              isPositive ? 'text-green-600' : isNeutral ? 'text-gray-500' : 'text-red-600'
            )}>
              {isPositive ? '+' : ''}{pointsDelta.toFixed(1)} pts
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {lineup.projectedPoints.toFixed(1)} projected
          </div>
        </div>
      </div>

      {/* Team Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Drivers</h4>
          <div className="space-y-1">
            {lineup.drivers.map((driver) => (
              <div key={driver.id} className="flex justify-between text-sm">
                <span className="text-f1-dark">{driver.name}</span>
                <span className="text-gray-600">${driver.price}M</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Constructors</h4>
          <div className="space-y-1">
            {lineup.constructors.map((constructor) => (
              <div key={constructor.id} className="flex justify-between text-sm">
                <span className="text-f1-dark">{constructor.name}</span>
                <span className="text-gray-600">${constructor.price}M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swaps */}
      {lineup.swaps.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <ArrowRightLeft size={14} className="mr-1" />
            Recommended Swaps
          </h4>
          <div className="space-y-1">
            {lineup.swaps.map((swap, index) => (
              <div key={index} className="text-sm bg-gray-50 rounded p-2">
                <span className="text-red-600">{swap.out.name}</span>
                <span className="text-gray-500 mx-2">→</span>
                <span className="text-green-600">{swap.in.name}</span>
                <span className="text-gray-500 ml-2">
                  (${(swap.in.price - swap.out.price).toFixed(1)}M)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget Info */}
      <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded">
        <span className="text-sm text-gray-700">Total Cost</span>
        <span className="font-medium text-f1-dark">${lineup.totalCost.toFixed(1)}M</span>
      </div>

      {/* Reasoning */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Why This Works</h4>
        <div className="space-y-1">
          {lineup.reasoning.map((reason, index) => (
            <p key={index} className="text-sm text-gray-600 leading-relaxed">
              • {reason}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
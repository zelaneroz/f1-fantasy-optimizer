import { useState } from 'react';
import type { Driver, Constructor, OptimizationCriteria, FantasyTeam, OptimizedLineup } from '../types/fantasy';
import TeamInputCard from '../components/TeamInputCard';
import BudgetBar from '../components/BudgetBar';
import CriteriaSelector from '../components/CriteriaSelector';
import OptimizerResultCard from '../components/OptimizerResultCard';
import { generateMockOptimizations } from '../data/mockOptimizations';

export default function Optimizer() {
  const [team, setTeam] = useState<FantasyTeam>({
    drivers: [],
    constructors: [],
    totalCost: 0,
    remainingBudget: 100,
  });

  const [criteria, setCriteria] = useState<OptimizationCriteria>({
    type: 'next-race',
    riskTolerance: 'moderate',
  });

  const [optimizedLineups, setOptimizedLineups] = useState<OptimizedLineup[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const updateDriver = (index: number, driver: Driver | null) => {
    const newDrivers = [...team.drivers];
    if (driver) {
      newDrivers[index] = driver;
    } else {
      newDrivers.splice(index, 1);
    }
    updateTeamCost(newDrivers, team.constructors);
  };

  const updateConstructor = (index: number, constructor: Constructor | null) => {
    const newConstructors = [...team.constructors];
    if (constructor) {
      newConstructors[index] = constructor;
    } else {
      newConstructors.splice(index, 1);
    }
    updateTeamCost(team.drivers, newConstructors);
  };

  const updateTeamCost = (drivers: Driver[], constructors: Constructor[]) => {
    const totalCost = [...drivers, ...constructors].reduce((sum, item) => sum + item.price, 0);
    setTeam({
      drivers,
      constructors,
      totalCost,
      remainingBudget: 100 - totalCost,
    });
  };

  const canOptimize = team.drivers.length === 5 && team.constructors.length === 2 && team.totalCost <= 100;

  const handleOptimize = async () => {
    setIsOptimizing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOptimizedLineups(generateMockOptimizations(team, criteria));
    setIsOptimizing(false);
  };

  return (
    <div className="min-h-screen bg-f1-light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-f1-dark mb-8">Team Optimizer</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Current Team */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-f1-dark mb-4">Current Team</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-f1-dark mb-3">Drivers (5)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <TeamInputCard
                      key={`driver-${i}`}
                      type="driver"
                      slot={i}
                      selected={team.drivers[i]}
                      onSelect={(driver) => updateDriver(i, driver as Driver)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-f1-dark mb-3">Constructors (2)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 2 }, (_, i) => (
                    <TeamInputCard
                      key={`constructor-${i}`}
                      type="constructor"
                      slot={i}
                      selected={team.constructors[i]}
                      onSelect={(constructor) => updateConstructor(i, constructor as Constructor)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Tracker */}
            <BudgetBar totalSpent={team.totalCost} budgetCap={100} />

            {/* Optimization Criteria */}
            <CriteriaSelector criteria={criteria} onChange={setCriteria} />
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-f1-dark mb-4">Optimized Suggestions</h2>

              {!canOptimize ? (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-4">
                    Complete your team to see optimization suggestions
                  </div>
                  <div className="text-sm text-gray-400">
                    Select {5 - team.drivers.length} more drivers and {2 - team.constructors.length} more constructors
                    {team.totalCost > 100 && <div className="text-red-500 mt-2">Team is over budget</div>}
                  </div>
                </div>
              ) : optimizedLineups.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-f1-red font-semibold mb-2">
                    🏁 Team Complete!
                  </div>
                  <p className="text-gray-600 mb-4">
                    Ready to generate optimized lineup suggestions
                  </p>
                  <button
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className="px-6 py-3 bg-f1-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isOptimizing ? 'Optimizing...' : 'Generate Optimized Lineups'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <button
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className="px-4 py-2 bg-f1-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isOptimizing ? 'Re-optimizing...' : 'Re-optimize'}
                  </button>
                </div>
              )}
            </div>

            {/* Results Display */}
            {isOptimizing && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-f1-red mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing {criteria.type} strategy...</p>
                </div>
              </div>
            )}

            {optimizedLineups.length > 0 && !isOptimizing && (
              <div className="space-y-4">
                {optimizedLineups.map((lineup, index) => (
                  <OptimizerResultCard
                    key={lineup.id}
                    lineup={lineup}
                    rank={index + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
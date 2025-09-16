import type { Driver, Constructor, FantasyTeam, OptimizationCriteria, OptimizedLineup } from '../types/fantasy';
import { mockDrivers, mockConstructors } from '../data/mockData';

interface PerformanceMetrics {
  nextRacePoints: number;
  next3RacesPoints: number;
  budgetEfficiency: number;
  riskScore: number;
  valueScore: number;
}

// Calculate performance scores for drivers and constructors
const calculatePerformanceMetrics = (
  item: Driver | Constructor
): PerformanceMetrics => {
  const basePoints = item.lastScore;
  const priceEfficiency = basePoints / item.price;

  // Mock performance projections based on recent form and price
  let nextRacePoints = basePoints + (Math.random() * 10 - 5); // ±5 variance
  let next3RacesPoints = nextRacePoints * 3 + (Math.random() * 15 - 7.5);

  // Adjust for ownership (differential picks)
  const ownershipPenalty = item.ownership > 50 ? -2 : item.ownership < 20 ? 3 : 0;
  nextRacePoints += ownershipPenalty;
  next3RacesPoints += ownershipPenalty * 3;

  // Risk scoring (higher price = lower risk, lower ownership = higher risk)
  const riskScore = (item.price / 35) * 100 - (item.ownership / 100) * 30;

  return {
    nextRacePoints: Math.max(0, nextRacePoints),
    next3RacesPoints: Math.max(0, next3RacesPoints),
    budgetEfficiency: priceEfficiency * 10,
    riskScore,
    valueScore: priceEfficiency * (100 - item.ownership) / 100
  };
};

// Score a complete lineup based on criteria
const scoreLineup = (
  drivers: Driver[],
  constructors: Constructor[],
  criteria: OptimizationCriteria
): number => {
  const allItems = [...drivers, ...constructors];
  let totalScore = 0;

  allItems.forEach(item => {
    const metrics = calculatePerformanceMetrics(item);

    switch (criteria.type) {
      case 'next-race':
        totalScore += metrics.nextRacePoints;
        break;
      case 'next-3-races':
        totalScore += metrics.next3RacesPoints / 3;
        break;
      case 'budget-growth':
        totalScore += metrics.valueScore * 2;
        break;
      case 'balanced':
        totalScore += (metrics.nextRacePoints + metrics.budgetEfficiency + metrics.valueScore) / 3;
        break;
    }

    // Risk tolerance adjustments
    switch (criteria.riskTolerance) {
      case 'conservative':
        if (metrics.riskScore < 30) totalScore -= 5;
        break;
      case 'aggressive':
        if (metrics.riskScore > 70) totalScore += 3;
        break;
    }
  });

  return totalScore;
};

// Generate team combinations within budget
const generateTeamCombinations = (budgetLimit = 100): Array<{drivers: Driver[], constructors: Constructor[]}> => {
  const combinations: Array<{drivers: Driver[], constructors: Constructor[]}> = [];
  const maxCombinations = 1000; // Limit for performance

  // Get reasonable driver pools by price tier
  const expensiveDrivers = mockDrivers.filter(d => d.price > 20);
  const midDrivers = mockDrivers.filter(d => d.price >= 15 && d.price <= 20);
  const budgetDrivers = mockDrivers.filter(d => d.price < 15);

  // Generate combinations with different strategies
  for (let i = 0; i < maxCombinations && combinations.length < 50; i++) {
    const drivers: Driver[] = [];
    let currentCost = 0;

    // Strategy 1: 2 expensive, 2 mid, 1 budget
    if (Math.random() > 0.3) {
      // Pick 2 expensive drivers
      const shuffledExpensive = [...expensiveDrivers].sort(() => Math.random() - 0.5);
      for (let j = 0; j < 2 && j < shuffledExpensive.length; j++) {
        if (currentCost + shuffledExpensive[j].price <= budgetLimit - 30) { // Leave room for constructors
          drivers.push(shuffledExpensive[j]);
          currentCost += shuffledExpensive[j].price;
        }
      }

      // Fill remaining slots
        // Reserve budget for constructors

      const allRemaining = [...midDrivers, ...budgetDrivers]
        .filter(d => !drivers.includes(d))
        .sort(() => Math.random() - 0.5);

      for (let j = 0; j < allRemaining.length && drivers.length < 5; j++) {
        if (currentCost + allRemaining[j].price <= budgetLimit - 25) {
          drivers.push(allRemaining[j]);
          currentCost += allRemaining[j].price;
        }
      }
    }

    // Only proceed if we have 5 drivers
    if (drivers.length === 5) {
      // Pick 2 constructors within remaining budget
      const remainingBudget = budgetLimit - currentCost;
      const shuffledConstructors = [...mockConstructors].sort(() => Math.random() - 0.5);

      for (let c1 = 0; c1 < shuffledConstructors.length; c1++) {
        for (let c2 = c1 + 1; c2 < shuffledConstructors.length; c2++) {
          const constructorCost = shuffledConstructors[c1].price + shuffledConstructors[c2].price;
          if (constructorCost <= remainingBudget) {
            combinations.push({
              drivers,
              constructors: [shuffledConstructors[c1], shuffledConstructors[c2]]
            });
            break;
          }
        }
        if (combinations.length >= 50) break;
      }
    }
  }

  return combinations;
};

// Main optimization function
export const optimizeTeam = (
  currentTeam: FantasyTeam,
  criteria: OptimizationCriteria
): OptimizedLineup[] => {
  const combinations = generateTeamCombinations();
  const currentScore = scoreLineup(currentTeam.drivers, currentTeam.constructors, criteria);

  // Score all combinations
  const scoredCombinations = combinations.map(combo => {
    const score = scoreLineup(combo.drivers, combo.constructors, criteria);
    const totalCost = [...combo.drivers, ...combo.constructors].reduce((sum, item) => sum + item.price, 0);

    return {
      ...combo,
      score,
      totalCost,
      pointsDelta: score - currentScore
    };
  });

  // Sort by score and take top 3
  const topCombinations = scoredCombinations
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Convert to OptimizedLineup format
  return topCombinations.map((combo, index) => {
    const swaps: Array<{type: 'driver' | 'constructor', out: Driver | Constructor, in: Driver | Constructor}> = [];

    // Find swaps for drivers
    currentTeam.drivers.forEach(currentDriver => {
      if (!combo.drivers.find(d => d.id === currentDriver.id)) {
        const replacement = combo.drivers.find(d => !currentTeam.drivers.find(cd => cd.id === d.id));
        if (replacement) {
          swaps.push({ type: 'driver', out: currentDriver, in: replacement });
        }
      }
    });

    // Find swaps for constructors
    currentTeam.constructors.forEach(currentConstructor => {
      if (!combo.constructors.find(c => c.id === currentConstructor.id)) {
        const replacement = combo.constructors.find(c => !currentTeam.constructors.find(cc => cc.id === c.id));
        if (replacement) {
          swaps.push({ type: 'constructor', out: currentConstructor, in: replacement });
        }
      }
    });

    // Generate reasoning
    const reasoning = generateReasoning(combo, criteria, swaps);

    return {
      id: `optimized-${index + 1}`,
      drivers: combo.drivers,
      constructors: combo.constructors,
      projectedPoints: combo.score,
      currentTeamPoints: currentScore,
      pointsDelta: combo.pointsDelta,
      totalCost: combo.totalCost,
      swaps,
      reasoning
    };
  });
};

const generateReasoning = (
  combo: {drivers: Driver[], constructors: Constructor[]},
  criteria: OptimizationCriteria,
  swaps: Array<{type: 'driver' | 'constructor', out: Driver | Constructor, in: Driver | Constructor}>
): string[] => {
  const reasoning: string[] = [];

  // Strategy-specific reasoning
  switch (criteria.type) {
    case 'next-race':
      reasoning.push(`Optimized for immediate points in the next race based on recent form and circuit suitability`);
      break;
    case 'next-3-races':
      reasoning.push(`Balanced across next 3 races to maximize sustained performance and minimize variance`);
      break;
    case 'budget-growth':
      reasoning.push(`Focused on drivers with strong price appreciation potential and differential picks`);
      break;
    case 'balanced':
      reasoning.push(`Combines short-term performance with long-term value and budget efficiency`);
      break;
  }

  // Swap-specific reasoning
  if (swaps.length > 0) {
    const driverSwaps = swaps.filter(s => s.type === 'driver');
    const constructorSwaps = swaps.filter(s => s.type === 'constructor');

    if (driverSwaps.length > 0) {
      const swap = driverSwaps[0];
      const priceDiff = swap.in.price - swap.out.price;
      const ownershipDiff = swap.in.ownership - swap.out.ownership;

      if (ownershipDiff < -20) {
        reasoning.push(`${swap.in.name} offers differential pick advantage with ${swap.in.ownership.toFixed(1)}% ownership vs ${swap.out.ownership.toFixed(1)}%`);
      } else if (priceDiff < -5) {
        reasoning.push(`${swap.in.name} provides excellent budget efficiency at $${swap.in.price}M vs ${swap.out.name} at $${swap.out.price}M`);
      } else {
        reasoning.push(`${swap.in.name} projected to outperform ${swap.out.name} based on current form and circuit characteristics`);
      }
    }

    if (constructorSwaps.length > 0) {
      const swap = constructorSwaps[0];
      reasoning.push(`${swap.in.name} constructor offers better correlation with selected drivers and recent performance trends`);
    }
  }

  // Add budget efficiency note if relevant
  const totalCost = [...combo.drivers, ...combo.constructors].reduce((sum, item) => sum + item.price, 0);
  if (totalCost < 95) {
    reasoning.push(`Efficient use of ${totalCost.toFixed(1)}M budget leaves room for future transfers and tactical changes`);
  }

  return reasoning;
};
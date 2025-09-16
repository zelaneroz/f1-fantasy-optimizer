export interface Driver {
  id: string;
  name: string;
  team: string;
  price: number;
  lastScore: number;
  ownership: number;
  imageUrl?: string;
}

export interface Constructor {
  id: string;
  name: string;
  price: number;
  lastScore: number;
  ownership: number;
  imageUrl?: string;
}

export interface FantasyTeam {
  drivers: Driver[];
  constructors: Constructor[];
  totalCost: number;
  remainingBudget: number;
}

export interface OptimizationCriteria {
  type: 'next-race' | 'next-3-races' | 'budget-growth' | 'balanced';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface OptimizedLineup {
  id: string;
  drivers: Driver[];
  constructors: Constructor[];
  projectedPoints: number;
  currentTeamPoints: number;
  pointsDelta: number;
  totalCost: number;
  reasoning: string[];
  swaps: Array<{
    type: 'driver' | 'constructor';
    out: Driver | Constructor;
    in: Driver | Constructor;
  }>;
}
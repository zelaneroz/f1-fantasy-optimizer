import type { OptimizedLineup, FantasyTeam, OptimizationCriteria } from '../types/fantasy';
import { optimizeTeam } from '../utils/optimizer';
import { mockDrivers, mockConstructors } from './mockData';

export const generateMockOptimizations = (
  currentTeam?: FantasyTeam,
  criteria?: OptimizationCriteria
): OptimizedLineup[] => {
  // If real team data is provided, use the optimizer
  if (currentTeam && criteria && currentTeam.drivers.length === 5 && currentTeam.constructors.length === 2) {
    return optimizeTeam(currentTeam, criteria);
  }

  // Fallback to predefined examples for demonstration
  return [
    {
      id: '1',
      drivers: [
        mockDrivers.find(d => d.id === 'VER')!,
        mockDrivers.find(d => d.id === 'NOR')!,
        mockDrivers.find(d => d.id === 'LEC')!,
        mockDrivers.find(d => d.id === 'RUS')!,
        mockDrivers.find(d => d.id === 'COL')!,
      ],
      constructors: [
        mockConstructors.find(c => c.id === 'McLaren')!,
        mockConstructors.find(c => c.id === 'Ferrari')!,
      ],
      projectedPoints: 142.3,
      currentTeamPoints: 128.5,
      pointsDelta: 13.8,
      totalCost: 99.2,
      swaps: [
        {
          type: 'driver',
          out: mockDrivers.find(d => d.id === 'PER')!,
          in: mockDrivers.find(d => d.id === 'COL')!,
        },
      ],
      reasoning: [
        'Colapinto offers exceptional value at $8.0M with strong rookie performance trends',
        'McLaren-Ferrari constructor pairing optimizes for high-speed circuit performance',
        'Verstappen-Norris-Leclerc core provides consistent top-6 finish probability'
      ]
    },
    {
      id: '2',
      drivers: [
        mockDrivers.find(d => d.id === 'VER')!,
        mockDrivers.find(d => d.id === 'NOR')!,
        mockDrivers.find(d => d.id === 'LEC')!,
        mockDrivers.find(d => d.id === 'PIA')!,
        mockDrivers.find(d => d.id === 'ALB')!,
      ],
      constructors: [
        mockConstructors.find(c => c.id === 'McLaren')!,
        mockConstructors.find(c => c.id === 'Red Bull Racing')!,
      ],
      projectedPoints: 138.7,
      currentTeamPoints: 128.5,
      pointsDelta: 10.2,
      totalCost: 98.8,
      swaps: [
        {
          type: 'driver',
          out: mockDrivers.find(d => d.id === 'HAM')!,
          in: mockDrivers.find(d => d.id === 'ALB')!,
        },
      ],
      reasoning: [
        'Albon provides budget efficiency at $8.7M with Williams\' recent points-scoring form',
        'Red Bull constructor adds reliability despite recent struggles',
        'Piastri-Norris McLaren stack maximizes constructor correlation benefits'
      ]
    },
    {
      id: '3',
      drivers: [
        mockDrivers.find(d => d.id === 'NOR')!,
        mockDrivers.find(d => d.id === 'LEC')!,
        mockDrivers.find(d => d.id === 'PIA')!,
        mockDrivers.find(d => d.id === 'RUS')!,
        mockDrivers.find(d => d.id === 'HUL')!,
      ],
      constructors: [
        mockConstructors.find(c => c.id === 'McLaren')!,
        mockConstructors.find(c => c.id === 'Mercedes')!,
      ],
      projectedPoints: 134.1,
      currentTeamPoints: 128.5,
      pointsDelta: 5.6,
      totalCost: 96.4,
      swaps: [
        {
          type: 'driver',
          out: mockDrivers.find(d => d.id === 'VER')!,
          in: mockDrivers.find(d => d.id === 'HUL')!,
        },
        {
          type: 'constructor',
          out: mockConstructors.find(c => c.id === 'Ferrari')!,
          in: mockConstructors.find(c => c.id === 'Mercedes')!,
        },
      ],
      reasoning: [
        'Budget-focused strategy frees up $3.6M for future transfers',
        'Hülkenberg delivers consistent points at Haas despite low ownership',
        'Mercedes constructor offers strong midfield correlation with Russell'
      ]
    }
  ];
};
import type { Driver, Constructor } from '../types/fantasy';

export const mockDrivers: Driver[] = [
  { id: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', price: 32.5, lastScore: 26, ownership: 85.2 },
  { id: 'NOR', name: 'Lando Norris', team: 'McLaren', price: 24.8, lastScore: 18, ownership: 45.7 },
  { id: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', price: 22.1, lastScore: 15, ownership: 38.9 },
  { id: 'PIA', name: 'Oscar Piastri', team: 'McLaren', price: 19.3, lastScore: 12, ownership: 29.4 },
  { id: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', price: 18.7, lastScore: 10, ownership: 22.1 },
  { id: 'RUS', name: 'George Russell', team: 'Mercedes', price: 17.9, lastScore: 8, ownership: 18.6 },
  { id: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes', price: 17.2, lastScore: 6, ownership: 31.7 },
  { id: 'PER', name: 'Sergio Pérez', team: 'Red Bull Racing', price: 16.8, lastScore: 4, ownership: 12.3 },
  { id: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin', price: 14.5, lastScore: 2, ownership: 15.8 },
  { id: 'STR', name: 'Lance Stroll', team: 'Aston Martin', price: 12.1, lastScore: 0, ownership: 8.4 },
  { id: 'GAS', name: 'Pierre Gasly', team: 'Alpine', price: 11.8, lastScore: 1, ownership: 6.2 },
  { id: 'OCO', name: 'Esteban Ocon', team: 'Alpine', price: 11.3, lastScore: 0, ownership: 4.7 },
  { id: 'HUL', name: 'Nico Hülkenberg', team: 'Haas', price: 10.9, lastScore: 0, ownership: 7.1 },
  { id: 'MAG', name: 'Kevin Magnussen', team: 'Haas', price: 10.4, lastScore: 0, ownership: 3.8 },
  { id: 'TSU', name: 'Yuki Tsunoda', team: 'RB', price: 9.8, lastScore: 0, ownership: 5.5 },
  { id: 'RIC', name: 'Daniel Ricciardo', team: 'RB', price: 9.2, lastScore: 0, ownership: 4.2 },
  { id: 'ALB', name: 'Alexander Albon', team: 'Williams', price: 8.7, lastScore: 0, ownership: 6.9 },
  { id: 'COL', name: 'Franco Colapinto', team: 'Williams', price: 8.0, lastScore: 0, ownership: 12.4 },
  { id: 'BOT', name: 'Valtteri Bottas', team: 'Kick Sauber', price: 7.5, lastScore: 0, ownership: 2.1 },
  { id: 'ZHO', name: 'Zhou Guanyu', team: 'Kick Sauber', price: 7.0, lastScore: 0, ownership: 1.8 },
];

export const mockConstructors: Constructor[] = [
  { id: 'McLaren', name: 'McLaren', price: 25.4, lastScore: 30, ownership: 67.3 },
  { id: 'Ferrari', name: 'Ferrari', price: 22.8, lastScore: 25, ownership: 43.1 },
  { id: 'Red Bull Racing', name: 'Red Bull Racing', price: 21.9, lastScore: 30, ownership: 58.9 },
  { id: 'Mercedes', name: 'Mercedes', price: 18.7, lastScore: 14, ownership: 25.4 },
  { id: 'Aston Martin', name: 'Aston Martin', price: 12.3, lastScore: 2, ownership: 18.2 },
  { id: 'Alpine', name: 'Alpine', price: 11.1, lastScore: 1, ownership: 8.7 },
  { id: 'Haas', name: 'Haas', price: 10.8, lastScore: 0, ownership: 12.3 },
  { id: 'RB', name: 'RB', price: 9.4, lastScore: 0, ownership: 6.1 },
  { id: 'Williams', name: 'Williams', price: 8.2, lastScore: 0, ownership: 9.8 },
  { id: 'Kick Sauber', name: 'Kick Sauber', price: 7.0, lastScore: 0, ownership: 2.4 },
];
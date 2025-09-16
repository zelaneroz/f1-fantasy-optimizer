# F1 Fantasy Optimizer

A comprehensive Formula One fantasy optimizer that helps users build optimal fantasy lineups using machine learning predictions and constraint-based optimization.


The F1 Fantasy Optimizer combines historical race data, weather conditions, and driver performance metrics to predict optimal fantasy lineups. The system uses XGBoost models for performance prediction and implements a constraint-based solver to generate optimal team selections within budget constraints.

## Features

- **Fantasy Team Optimization**: Generate optimal driver and constructor lineups based on budget constraints
- **Multiple Optimization Strategies**:
  - Next race optimization
  - Next 3 races optimization
  - Budget growth strategy
  - Balanced approach
- **Risk Management**: Conservative, moderate, and aggressive risk tolerance settings
- **Performance Analytics**: Detailed statistics and historical performance tracking
- **Interactive Dashboard**: Modern React-based web interface with responsive design

## Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **Routing**: React Router for multi-page navigation
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building

### Core Components
- **Landing Page**: Introduction and overview of the optimizer
- **Optimizer**: Main interface for team selection and optimization
- **Stats**: Performance analytics and historical data
- **About**: Project information and methodology

### Data Models
- **Driver**: Individual driver data including price, performance, and ownership
- **Constructor**: Team data with pricing and performance metrics
- **FantasyTeam**: Complete team configuration with budget tracking
- **OptimizedLineup**: Generated optimal lineups with reasoning and swap recommendations

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/f1-fantasy-optimizer.git
cd f1-fantasy-optimizer
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

In the frontend directory:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
f1-fantasy-optimizer/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   └── data/           # Mock data and constants
│   ├── public/             # Static assets
│   └── package.json        # Dependencies and scripts
└── README.md
```

## Development Roadmap

### Phase 1: Frontend Foundation (Current)
- React-based user interface
- Fantasy team management
- Basic optimization algorithms
- Responsive design

### Phase 2: Data Integration (Planned)
- Historical race data scraping
- Weather data integration
- Driver performance metrics
- Real-time data updates

### Phase 3: Machine Learning (Planned)
- XGBoost model training
- Performance prediction algorithms
- Model validation and testing
- Automated retraining pipeline

### Phase 4: Backend Services (Planned)
- API development
- Database integration
- User authentication
- Data persistence

### Phase 5: MLOps Pipeline (Planned)
- Automated model deployment
- Performance monitoring
- A/B testing framework
- Continuous integration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Charts**: Recharts
- **Routing**: React Router
- **Linting**: ESLint
- **Package Manager**: npm


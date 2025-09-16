import { Link } from 'react-router-dom';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-f1-dark via-f1-gray to-f1-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            F1 Fantasy <span className="text-f1-red">Optimizer</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Optimize your Formula 1 Fantasy lineup with data-driven insights,
            performance predictions, and strategic recommendations.
          </p>
          <Link
            to="/optimizer"
            className="inline-flex items-center px-8 py-4 bg-f1-red hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Zap className="mr-2" size={20} />
            Start Optimizing
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <TrendingUp className="mx-auto mb-4 text-f1-red" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">Smart Predictions</h3>
            <p className="text-gray-300">
              AI-powered driver and constructor performance forecasts based on historical data.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <BarChart3 className="mx-auto mb-4 text-f1-red" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">Budget Management</h3>
            <p className="text-gray-300">
              Optimize your 100M budget with intelligent swap suggestions and price tracking.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <Zap className="mx-auto mb-4 text-f1-red" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">Multiple Strategies</h3>
            <p className="text-gray-300">
              Choose from next race, multi-race, or budget growth optimization strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
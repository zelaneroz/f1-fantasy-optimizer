export default function About() {
  return (
    <div className="min-h-screen bg-f1-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-f1-dark mb-8">About F1 Fantasy Optimizer</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">What is this tool?</h2>
            <p className="text-gray-700 mb-4">
              The F1 Fantasy Optimizer is a data-driven companion tool designed to help you make
              informed decisions for your Formula 1 Fantasy team. Using historical performance data,
              circuit characteristics, and advanced algorithms, we provide optimized lineup suggestions
              to maximize your fantasy points.
            </p>
            <p className="text-gray-700">
              <strong>Important:</strong> This is an unofficial tool and is not affiliated with
              Formula 1 or the official F1 Fantasy game.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">How it works</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-f1-red font-bold mr-2">1.</span>
                Input your current fantasy team (drivers and constructors)
              </li>
              <li className="flex items-start">
                <span className="text-f1-red font-bold mr-2">2.</span>
                Choose your optimization strategy (next race, multi-race, or budget growth)
              </li>
              <li className="flex items-start">
                <span className="text-f1-red font-bold mr-2">3.</span>
                Get personalized recommendations with clear explanations
              </li>
              <li className="flex items-start">
                <span className="text-f1-red font-bold mr-2">4.</span>
                Review projected points and budget efficiency
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-f1-dark mb-2">How are points calculated?</h3>
                <p className="text-gray-700">
                  All projections are based on the official F1 Fantasy scoring system: race finishing
                  position, qualifying position, fastest lap, and bonus points for beating teammates.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-f1-dark mb-2">How accurate are the predictions?</h3>
                <p className="text-gray-700">
                  Our algorithms use historical data and machine learning models, but Formula 1 is
                  unpredictable by nature. Use these as guidance alongside your own analysis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-f1-dark mb-2">What data sources do you use?</h3>
                <p className="text-gray-700">
                  We analyze historical race results, qualifying performances, circuit characteristics,
                  weather data, and fantasy price movements to generate our recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
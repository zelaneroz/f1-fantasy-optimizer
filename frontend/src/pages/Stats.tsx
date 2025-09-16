import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import { driverPerformanceData, constructorPerformanceData, priceMovementData, ownershipData } from '../data/mockStatsData';

export default function Stats() {
  const topDrivers = ['VER', 'NOR', 'LEC', 'PIA', 'RUS'];
  const driverColors = {
    VER: '#FF6B6B',
    NOR: '#4ECDC4',
    LEC: '#45B7D1',
    PIA: '#96CEB4',
    RUS: '#FFEAA7',
    SAI: '#DDA0DD',
    HAM: '#98D8C8',
  };

  return (
    <div className="min-h-screen bg-f1-light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-f1-dark mb-8">Performance Stats</h1>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Driver Performance Trends */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">Driver Performance Trends</h2>
            <p className="text-gray-600 mb-4">Points scored across last 5 races</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driverPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="race" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`${value} pts`, name]}
                    labelFormatter={(label) => `Race: ${label}`}
                  />
                  {topDrivers.map((driver) => (
                    <Line
                      key={driver}
                      type="monotone"
                      dataKey={driver}
                      stroke={driverColors[driver as keyof typeof driverColors]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Constructor Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">Constructor Comparison</h2>
            <p className="text-gray-600 mb-4">Average points per race</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={constructorPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} pts`, 'Avg Points']} />
                  <Bar dataKey="avgPoints" fill="#E10600" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Price Movements */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">Price Movements</h2>
            <p className="text-gray-600 mb-4">Driver price changes over time</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceMovementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip
                    formatter={(value, name) => [`$${value}M`, name]}
                    labelFormatter={(label) => `${label}`}
                  />
                  {topDrivers.map((driver) => (
                    <Line
                      key={driver}
                      type="monotone"
                      dataKey={driver}
                      stroke={driverColors[driver as keyof typeof driverColors]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ownership vs Price */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-f1-dark mb-4">Ownership vs Price</h2>
            <p className="text-gray-600 mb-4">Driver popularity and value analysis</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={ownershipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="price"
                    name="Price"
                    unit="M"
                    domain={[5, 35]}
                  />
                  <YAxis
                    type="number"
                    dataKey="ownership"
                    name="Ownership"
                    unit="%"
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'ownership' ? `${value}%` : `$${value}M`,
                      name === 'ownership' ? 'Ownership' : 'Price'
                    ]}
                    labelFormatter={(_, payload) =>
                      payload?.[0]?.payload?.name || ''
                    }
                  />
                  <Scatter dataKey="ownership" fill="#E10600" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-f1-red">32.5M</div>
            <div className="text-sm text-gray-600">Highest Price</div>
            <div className="text-xs text-gray-500">Max Verstappen</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-f1-red">85.2%</div>
            <div className="text-sm text-gray-600">Top Ownership</div>
            <div className="text-xs text-gray-500">Max Verstappen</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-f1-red">32.4</div>
            <div className="text-sm text-gray-600">Best Constructor</div>
            <div className="text-xs text-gray-500">McLaren avg pts</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-f1-red">8.0M</div>
            <div className="text-sm text-gray-600">Best Value</div>
            <div className="text-xs text-gray-500">Franco Colapinto</div>
          </div>
        </div>
      </div>
    </div>
  );
}
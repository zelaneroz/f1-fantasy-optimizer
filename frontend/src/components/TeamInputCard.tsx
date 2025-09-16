import { useState } from 'react';
import { X, User, Building } from 'lucide-react';
import type { Driver, Constructor } from '../types/fantasy';
import { mockDrivers, mockConstructors } from '../data/mockData';
import { clsx } from 'clsx';

interface TeamInputCardProps {
  type: 'driver' | 'constructor';
  slot: number;
  selected?: Driver | Constructor;
  onSelect: (item: Driver | Constructor | null) => void;
}

export default function TeamInputCard({ type, slot, selected, onSelect }: TeamInputCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const items = type === 'driver' ? mockDrivers : mockConstructors;
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (type === 'driver' && (item as Driver).team.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (item: Driver | Constructor) => {
    onSelect(item);
    setIsOpen(false);
    setSearch('');
  };

  const handleRemove = () => {
    onSelect(null);
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          'border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[120px] cursor-pointer transition-all',
          selected ? 'border-solid border-f1-red bg-white' : 'hover:border-gray-400 bg-gray-50'
        )}
        onClick={() => setIsOpen(true)}
      >
        {selected ? (
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {type === 'driver' ? <User size={16} className="mr-2 text-f1-red" /> : <Building size={16} className="mr-2 text-f1-red" />}
                <span className="font-semibold text-f1-dark">{selected.name}</span>
              </div>
              {type === 'driver' && (
                <p className="text-sm text-gray-600 mb-1">{(selected as Driver).team}</p>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">${selected.price}M</span>
                <span className="text-gray-600">{selected.lastScore} pts</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {selected.ownership.toFixed(1)}% owned
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="text-gray-400 hover:text-red-500 ml-2"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            {type === 'driver' ? <User size={24} className="mb-2" /> : <Building size={24} className="mb-2" />}
            <span className="text-sm">Select {type} {slot + 1}</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${type}s...`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(item)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-f1-dark">{item.name}</div>
                    {type === 'driver' && (
                      <div className="text-sm text-gray-600">{(item as Driver).team}</div>
                    )}
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">${item.price}M</span>
                      <span className="text-gray-600">{item.lastScore} pts</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="px-3 py-4 text-center text-gray-500 text-sm">
              No {type}s found
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
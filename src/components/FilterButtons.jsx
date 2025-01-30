import React from 'react';

const FilterButtons = ({ currentFilter, setFilter }) => {
    const filters = [
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' }
    ];

    return (
        <div className="flex gap-2">
            {filters.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentFilter === value
                            ? 'bg-gradient-to-r from-sky-500 to-purple-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
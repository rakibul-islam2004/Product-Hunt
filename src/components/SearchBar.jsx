import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center space-x-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Search for products..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/products/search?query=${search}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result) => {
    setSearch(result.name);
    setShowSearch(false);
    setSearchResults([]);
    if (result._id) {
      navigate(`/product/${result._id}`);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setSearchResults([]);
      }
    };
    if (showSearch) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSearch, setShowSearch]);

  if (!showSearch) return null;

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-stone-300 rounded-full bg-white overflow-hidden transition-all duration-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100"
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}
        >
          <div className="flex items-center flex-1 px-5 py-2.5">
            <svg className="w-4 h-4 text-stone-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm text-stone-800 placeholder-stone-400"
              type="text"
              placeholder="Search for sofas, tables, or decor..."
              aria-label="Search for furniture"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1 pr-2">
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSearchResults([]);
                }}
                className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-amber-700 text-white rounded-full text-sm font-medium hover:bg-amber-800 transition-colors duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <span className="text-xs">Searching...</span>
              ) : (
                'Search'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowSearch(false);
                setSearchResults([]);
              }}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-all duration-200"
              title="Close search (Esc)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </form>

        {/* Search Results */}
        {(searchResults.length > 0 || (search && !isLoading)) && (
          <div
            className="mt-2 bg-white border border-stone-200 rounded-xl overflow-hidden"
            style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)' }}
          >
            {isLoading ? (
              <div className="p-4 text-center text-stone-500 text-sm">
                <span className="inline-block animate-spin mr-2">⟳</span> Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <li
                    key={result._id}
                    className="px-4 py-3 hover:bg-amber-50 cursor-pointer transition-colors duration-150 border-b border-stone-50 last:border-none flex items-center gap-3"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.image && result.image[0] && (
                      <img
                        src={result.image[0]}
                        alt={result.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-stone-800">{result.name}</p>
                      {result.price && (
                        <p className="text-xs text-amber-700 font-medium">${result.price}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              search && !isLoading && (
                <div className="p-4 text-center text-stone-500 text-sm">
                  No results found for "<span className="font-medium text-stone-700">{search}</span>"
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

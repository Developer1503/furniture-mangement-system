import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
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

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center p-4 relative">
      {isMobile ? (
        <button onClick={() => setShowSearch(true)} className="p-2">
          <img src={assets.search} alt="Open Search" />
        </button>
      ) : (
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center border border-gray-300 px-5 py-2 my-5 mx-auto rounded-full w-full max-w-lg relative shadow-md"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-inherit text-sm p-2"
            type="text"
            placeholder="Search for sofas, tables, or decor..."
            aria-label="Search for furniture"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-[60px] text-gray-500 hover:text-gray-700"
            >
              <img className="w-4" src={assets.cross_icon} alt="Clear" />
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-full flex items-center hover:bg-blue-600">
            {isLoading ? 'Searching...' : <img className="w-4" src={assets.search} alt="Search" />}
          </button>
        </form>
      )}
      <button
        onClick={() => setShowSearch(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        <img className="w-4" src={assets.cross_icon} alt="Close" />
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 w-full max-w-lg z-50">
          {searchResults.map((result) => (
            <li
              key={result._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearch(result.name);
                setShowSearch(false);
              }}
            >
              {result.name}
            </li>
          ))}
        </ul>
      ) : (
        search && !isLoading && (
          <p className="text-gray-500 mt-4">No results found for "{search}". Try searching for something else.</p>
        )
      )}
    </div>
  ) : null;
};

export default SearchBar;

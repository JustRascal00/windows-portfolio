import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CSE_ID = process.env.NEXT_PUBLIC_CSE_ID;
const LINK_PREVIEW_KEY = process.env.NEXT_PUBLIC_LINK_PREVIEW_KEY;

const SearchBrowser: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`
      );
      setResults(response.data.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setLoading(false);
  };

  const handleResultClick = async (url: string) => {
    try {
      const response = await axios.get(`https://api.linkpreview.net/?key=${LINK_PREVIEW_KEY}&q=${url}`);
      setPreview(response.data);
    } catch (error) {
      console.error('Error fetching link preview:', error);
    }
  };

  return (
    <div className="search-browser p-4 h-full flex flex-col">
      <form onSubmit={handleSearch} className="flex mb-4">
      <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search the web"
  className="flex-grow p-2 border border-gray-300 rounded bg-white text-black"
/>
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="flex-grow flex">
        <div className="w-1/3 overflow-y-auto pr-4">
          <ul className="search-results list-none p-0">
            {results.map((result, index) => (
              <li
                key={index}
                className="mb-4 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(result.link)}
              >
                <span className="text-blue-500 font-semibold hover:underline">
                  {result.title}
                </span>
                <p className="text-green-600 text-sm">{result.displayLink}</p>
                <p>{result.snippet}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3">
          {preview ? (
            <div className="link-preview">
              <h2>{preview.title}</h2>
              <img src={preview.image} alt="Preview" />
              <p>{preview.description}</p>
              <a href={preview.url} target="_blank" rel="noopener noreferrer">
                Visit Site
              </a>
            </div>
          ) : (
            <p className="text-center">Select a search result to preview</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBrowser;

import { useState } from "react";

// Utility function to debounce API calls
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function DebounceApi() {
  const [query, setQuery] = useState(""); // User input
  const [results, setResults] = useState([]); // API results
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState("Start searching for movies!"); // Default message
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const RESULTS_PER_PAGE = 5; // Number of results per page

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // OMDb API key
  let abortController = null; // AbortController instance

  // Fetch movie data from OMDb API
  const fetchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setMessage("Start searching for movies!");
      setResults([]);
      return;
    }

    // Cancel the previous request if it exists
    if (abortController) {
      abortController.abort();
    }

    // Create a new AbortController
    abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);
    setMessage(""); // Clear the message while loading
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`,
        { signal },
      );
      const data = await response.json();

      if (data.Response === "True") {
        setResults(data.Search);
        setCurrentPage(1); // Reset to the first page when new results are fetched
      } else {
        setMessage(data.Error || "No results found.");
        setResults([]);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Error fetching data:", error);
        setMessage("An error occurred while fetching data.");
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of the fetchResults function
  const debouncedFetchResults = debounce(fetchResults, 500);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchResults(value); // Call the debounced function
  };

  // Get paginated results
  const paginatedResults = () => {
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return results.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Debounce API Calls (OMDb)</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className="w-full p-2 border rounded mb-4"
      />
      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && message && <p className="text-gray-500">{message}</p>}
      <ul className="list-disc pl-5">
        {paginatedResults().map((movie) => (
          <li key={movie.imdbID} className="text-gray-700">
            <strong>{movie.Title}</strong> ({movie.Year})
          </li>
        ))}
      </ul>
      {/* Pagination Controls */}
      {results.length > RESULTS_PER_PAGE && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(results.length / RESULTS_PER_PAGE) },
            (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ),
          )}
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(results.length / RESULTS_PER_PAGE)
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// filepath: src/components/Pagination/Pagination.jsx
// import React, { useState } from "react";

// export default function Pagination() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 10;

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Pagination Feature</h2>
//       <div className="flex items-center justify-center space-x-2">
//         <button
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 rounded ${
//               currentPage === index + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 hover:bg-gray-400"
//             }`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//       <p className="mt-4 text-center">Current Page: {currentPage}</p>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [content, setContent] = useState([]); // Content for the current page
  const [loading, setLoading] = useState(false); // Loading state

  const ITEMS_PER_PAGE = 5; // Number of items per page
  const MAX_VISIBLE_PAGES = 9; // Maximum number of visible page numbers

  // Fetch content from an API
  const fetchContent = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${ITEMS_PER_PAGE}`,
      );
      const data = await response.json();
      const totalItems = response.headers.get("x-total-count"); // Total items from API
      setContent(data);
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchContent(page);
    }
  };

  // Generate visible page numbers with dots
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);

    if (totalPages <= MAX_VISIBLE_PAGES) {
      // If total pages are less than or equal to max visible pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Add the first page
      pages.push(1);

      if (currentPage > half + 2) {
        // Add dots if current page is far from the start
        pages.push("...");
      }

      // Add middle pages
      const startPage = Math.max(2, currentPage - half);
      const endPage = Math.min(totalPages - 1, currentPage + half);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - half - 1) {
        // Add dots if current page is far from the end
        pages.push("...");
      }

      // Add the last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Fetch content when the component mounts or the page changes
  useEffect(() => {
    fetchContent(currentPage);
  }, [currentPage]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pagination with API Content</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="list-disc pl-5 mb-4">
          {content.map((item) => (
            <li key={item.id} className="text-gray-700">
              {item.title}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-center space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {getVisiblePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          ),
        )}
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <p className="mt-4 text-center">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}


/*
Code Explanation
State Management:

currentPage: Tracks the current page number.
totalPages: Tracks the total number of pages.
content: Stores the content fetched from the API for the current page.
loading: Indicates whether the content is being loaded.
Pagination Logic:

The getVisiblePages function generates the visible page numbers:
Always includes the first and last pages.
Adds dots (...) when the current page is far from the start or end.
Shows a maximum of MAX_VISIBLE_PAGES numbers at a time.
UI Feedback:

Displays a loading message while fetching content.
Shows the current page number and total pages.
Disables the Previous button on the first page and the Next button on the last page.
Dots (...):

Dots are added dynamically based on the current page and total pages.

*/
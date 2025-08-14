import React, { useState, useEffect, useRef } from "react";

export default function CustomModal() {
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const modalRef = useRef(null); // Reference to the modal content

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Trap focus within the modal
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleFocusTrap = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleFocusTrap);
      return () => document.removeEventListener("keydown", handleFocusTrap);
    }
  }, [isOpen]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Custom Modal with Keyboard Interaction
      </h2>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-6 w-96 relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">This is a Custom Modal</h3>
            <p className="text-gray-700 mb-4">
              This modal traps focus and can be closed with the ESC key.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close Modal
            </button>
          </div>
          {/* Close modal when clicking outside */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

/*
Code Explanation
State Management:

isOpen: Tracks whether the modal is open or closed.
Keyboard Interaction:

The useEffect hook listens for the Escape key press to close the modal.
Another useEffect traps focus within the modal when it is open, ensuring accessibility.
Focus Management:

Focusable elements are identified, and focus is cycled between them when the Tab key is pressed.
Close Modal:

Clicking the close button (&times;).
Clicking outside the modal.
Pressing the Escape key.
*/
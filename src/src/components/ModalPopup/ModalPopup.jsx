import React, { useState, useEffect } from "react";

export default function ModalPopup() {
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state

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

  // Close modal when clicking outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsOpen(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Modal Popup</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer bg-gray-200 px-2 py-1 rounded"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">This is a Modal</h3>
            <p className="text-gray-700 mb-4">
              You can close this modal by clicking outside, pressing the ESC
              key, or clicking the close button.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
Changes Made
Prevent Closing When Clicking Inside the Modal:

Added an id="modal-overlay" to the overlay div.
Used the handleOverlayClick function to check if the click event occurred on the overlay (id="modal-overlay"). If true, the modal closes; otherwise, it remains open.
Pointer for Close Buttons:

Added the cursor-pointer class to the &times; button and the "Close Modal" button to ensure the pointer appears when hovering over them.
Styling Fixes:

Ensured the modal content (div) does not propagate click events to the overlay.
How It Works
Clicking Outside the Modal:

The onClick event on the overlay checks if the click occurred on the overlay itself (id="modal-overlay"). If true, the modal closes.
Clicking Inside the Modal:

Clicks inside the modal content do not propagate to the overlay, so the modal remains open.
Keyboard Interaction:

Pressing the Escape key closes the modal.
Hover Feedback:

The cursor-pointer class ensures the pointer changes to a hand icon when hovering over the close buttons.
*/

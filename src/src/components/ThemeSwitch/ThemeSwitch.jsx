import React, { useState, useEffect } from "react";

export default function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme mode

  // Apply the theme to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Light and Dark Mode
      </h2>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`px-4 py-2 rounded ${
          isDarkMode
            ? "bg-gray-700 text-white hover:bg-gray-500"
            : "bg-gray-300 text-black hover:bg-gray-400"
        }`}
      >
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
      <p className="mt-4 text-gray-800 dark:text-gray-100">
        Current Theme: <strong>{isDarkMode ? "Dark" : "Light"}</strong>
      </p>
    </div>
  );
}

/*
Code Explanation
State Management:

isDarkMode: Tracks whether the dark mode is enabled or not.
Theme Application:

The useEffect hook adds or removes the dark class on the document.documentElement (HTML tag) based on the isDarkMode state.
UI Feedback:

The button toggles between light and dark modes.
Displays the current theme (Light or Dark).
Tailwind Dark Mode:

Tailwind’s dark: classes are used to style elements for dark mode.

Changes Made
Text Color for Light and Dark Modes:

Added text-gray-800 dark:text-gray-100 to the <h2> and <p> elements to ensure the text is visible in both light and dark modes:
text-gray-800: Dark text for light mode.
dark:text-gray-100: Light text for dark mode.
Dynamic Button Text:

The button text dynamically switches between "Light" and "Dark" based on the current mode.
How It Works
Light Mode:

The text color is set to text-gray-800 (dark gray) for visibility on a light background.
Dark Mode:

The dark:text-gray-100 class ensures the text color changes to light gray for visibility on a dark background.
*/

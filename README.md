# **React Feature Showcase**

This project is a feature-rich React application built with **Vite** and styled using **Tailwind CSS**. It showcases multiple functionalities, including pagination, API integration, form validation, theme switching, and more. The project is designed for learning, portfolio building, and interview preparation.

---

## **Features**

### 1. **Pagination**
- Implements pagination with data fetched from an API.
- Displays only 9 page numbers at a time with dots (`...`) for better navigation.
- Disables "Previous" and "Next" buttons appropriately.

### 2. **Debounce API Calls**
- Demonstrates debouncing to optimize API calls.
- Fetches movie data from the **OMDb API**.
- Displays search results dynamically as the user types.

### 3. **Form Validation**
- Validates user input for name, email, and password.
- Displays error messages for invalid or missing inputs.
- Ensures password length is at least 6 characters.

### 4. **Weather App**
- Fetches real-time weather data using the **WeatherAPI**.
- Displays detailed weather information, including temperature, humidity, wind speed, and air quality index (AQI).
- Handles errors for invalid city names.

### 5. **GitHub Profile Finder**
- Fetches GitHub user profiles using the **GitHub API**.
- Displays user details such as avatar, bio, followers, and repositories.
- Provides a link to the user's GitHub profile.

### 6. **Modal Popup**
- A reusable modal component with multiple closing options:
  - Clicking outside the modal.
  - Pressing the `ESC` key.
  - Clicking the close button (`×`).
- Ensures accessibility with proper focus management.

### 9. **JSON Diff Viewer**
- Compares two JSON objects and highlights the differences.
- Displays added, removed, and changed keys in a readable format.
- Uses the `react-json-view` library for a user-friendly JSON display.
- Handles invalid JSON input gracefully with error messages.

### 7. **Theme Switch**
- Toggles between light and dark modes.
- Uses Tailwind's `dark:` classes for seamless theme switching.
- Displays the current theme dynamically.

---

## **Technologies Used**

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast development build tool.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JavaScript (ES6+)**: Core programming language.
- **APIs**:
  - [OMDb API](https://www.omdbapi.com/) for movie data.
  - [WeatherAPI](https://www.weatherapi.com/) for weather data.
  - [GitHub API](https://docs.github.com/en/rest) for GitHub profiles.
- **Libraries**:
  - [react-json-view](https://github.com/mac-s-g/react-json-view) for JSON visualization.

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm (v8 or higher)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-feature-showcase.git
   cd react-feature-showcase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## **Project Structure**

```
react-feature-project/
├── public/                 # Static assets
├── src/
│   ├── components/         # Feature components
│   │   ├── Pagination/     # Pagination feature
│   │   ├── DebounceApi/    # Debounce API Calls feature
│   │   ├── FormValidation/ # Form Validation feature
│   │   ├── WeatherApp/     # Weather App feature
│   │   ├── GithubProfileFinder/ # GitHub Profile Finder feature
│   │   ├── ModalPopup/     # Modal Popup feature
│   │   └── JsonDiffViewer/ # JSON Diff Viewer feature
│   │   ├── ThemeSwitch/    # Theme Switch feature
│   ├── App.jsx             # Main app component
│   ├── index.css           # Tailwind CSS imports
│   └── main.jsx            # Entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Project metadata and dependencies
```

---

## **Available Scripts**

### **Development**
```bash
npm run dev
```
Starts the development server.

### **Build**
```bash
npm run build
```
Builds the app for production.

### **Preview**
```bash
npm run preview
```
Previews the production build.

---


### **OMDb API**
- Sign up at [OMDb API](https://www.omdbapi.com/) to get your API key.
- Replace `YOUR_OMDB_API_KEY` in the `DebounceApi` component.

### **WeatherAPI**
- Sign up at [WeatherAPI](https://www.weatherapi.com/) to get your API key.
- Replace `YOUR_WEATHERAPI_KEY` in the `WeatherApp` component.

---

## **Contributing**

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **Contact**
- **GitHub**: [Sunny Shikhar](https://github.com/sunnyshikhar0)

---

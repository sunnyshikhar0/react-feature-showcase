import { useState } from "react";
import Pagination from "./Pagination/Pagination";
import DebounceApi from "./DebounceApi/DebounceApi";
import FormValidation from "./FormValidation/FormValidation";
import WeatherApp from "./WeatherApp/WeatherApp";
import GithubProfileFinder from "./GithubProfileFinder/GithubProfileFinder";
import ModalPopup from "./ModalPopup/ModalPopup";
import JsonDiffViewer from "./JsonDiffViewer/JsonDiffViewer";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";

function FeatureCard() {
  const [selectedFeature, setSelectedFeature] = useState("Pagination");

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          React Feature Showcase
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "Pagination"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("Pagination")}
          >
            Pagination
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "DebounceApi"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("DebounceApi")}
          >
            Debounce API
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "FormValidation"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("FormValidation")}
          >
            Form Validation
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "WeatherApp"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("WeatherApp")}
          >
            Weather App
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "GithubProfileFinder"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("GithubProfileFinder")}
          >
            GitHub Profile Finder
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "ModalPopup"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("ModalPopup")}
          >
            Modal Popup
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "JsonDiffViewer"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("JsonDiffViewer")}
          >
            JSON Diff Viewer
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFeature === "ThemeSwitch"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFeature("ThemeSwitch")}
          >
            Theme Switch
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {selectedFeature === "Pagination" && <Pagination />}
          {selectedFeature === "DebounceApi" && <DebounceApi />}
          {selectedFeature === "FormValidation" && <FormValidation />}
          {selectedFeature === "WeatherApp" && <WeatherApp />}
          {selectedFeature === "GithubProfileFinder" && <GithubProfileFinder />}
          {selectedFeature === "ModalPopup" && <ModalPopup />}
          {selectedFeature === "JsonDiffViewer" && <JsonDiffViewer />}
          {selectedFeature === "ThemeSwitch" && <ThemeSwitch />}
        </div>
      </div>
      ;
    </>
  );
}

export default FeatureCard




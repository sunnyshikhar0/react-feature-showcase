import { useState } from "react";
import ReactJson from "react-json-view";

export default function JsonDiffViewer() {
  const [json1, setJson1] = useState(""); // First JSON input
  const [json2, setJson2] = useState(""); // Second JSON input
  const [diff, setDiff] = useState(null); // JSON diff
  const [error, setError] = useState(""); // Error message

  // Utility function to calculate the diff between two JSON objects
  const calculateDiff = (obj1, obj2) => {
    const diff = {};
    for (const key in obj1) {
      if (obj2[key] === undefined) {
        diff[key] = { value: obj1[key], status: "removed" };
      } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        diff[key] = { value: obj1[key], status: "changed" };
      }
    }
    for (const key in obj2) {
      if (obj1[key] === undefined) {
        diff[key] = { value: obj2[key], status: "added" };
      }
    }
    return diff;
  };

  // Handle the diff calculation
  const handleDiff = () => {
    try {
      const parsedJson1 = JSON.parse(json1);
      const parsedJson2 = JSON.parse(json2);
      const diffResult = calculateDiff(parsedJson1, parsedJson2);
      setDiff(diffResult);
      setError("");
    } catch (err) {
      setError("Invalid JSON input. Please enter valid JSON objects.", err);
      setDiff(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">JSON Diff Viewer</h2>
      <div className="mb-4">
        <textarea
          value={json1}
          onChange={(e) => setJson1(e.target.value)}
          placeholder="Enter first JSON object"
          className="w-full p-2 border rounded mb-2"
          rows="5"
        ></textarea>
        <textarea
          value={json2}
          onChange={(e) => setJson2(e.target.value)}
          placeholder="Enter second JSON object"
          className="w-full p-2 border rounded"
          rows="5"
        ></textarea>
      </div>
      <button
        onClick={handleDiff}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Compare JSON
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {diff && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Differences:</h3>
          <ReactJson
            src={diff}
            theme="monokai"
            collapsed={2}
            enableClipboard={false}
            displayDataTypes={false}
          />
        </div>
      )}
    </div>
  );
}

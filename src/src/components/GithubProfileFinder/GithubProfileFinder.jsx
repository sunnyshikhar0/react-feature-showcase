import React, { useState } from "react";

export default function GithubProfileFinder() {
  const [username, setUsername] = useState(""); // User input for GitHub username
  const [profile, setProfile] = useState(null); // GitHub profile data
  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch GitHub profile data
  const fetchProfile = async () => {
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found.");
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">GitHub Profile Finder</h2>
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={fetchProfile}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {profile && (
        <div className="mt-4">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-lg font-bold text-center mt-2">{profile.name}</h3>
          <p className="text-center text-gray-700">@{profile.login}</p>
          <p className="text-center text-gray-700">{profile.bio}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <p>Followers: {profile.followers}</p>
            <p>Following: {profile.following}</p>
            <p>Repos: {profile.public_repos}</p>
          </div>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-blue-500 mt-4"
          >
            View Profile on GitHub
          </a>
        </div>
      )}
    </div>
  );
}


/* 
Code Explanation
State Management:

username: Stores the user input for the GitHub username.
profile: Stores the fetched GitHub profile data.
error: Stores error messages (e.g., invalid username).
loading: Indicates whether the API call is in progress.
API Call:

The fetchProfile function makes a GET request to the GitHub API.
It handles errors (e.g., user not found) and updates the state accordingly.
UI Feedback:

Displays a loading message while fetching data.
Shows error messages for invalid input or API errors.
Displays profile details when data is successfully fetched.
*/
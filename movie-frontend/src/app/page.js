"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for editing
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [director, setDirector] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/movies/${id}`, {
      method: "DELETE",
    });
    fetchMovies();
  };

  const handleEditClick = (movie) => {
    setEditingId(movie.id);
    setTitle(movie.title);
    setReleaseYear(movie.releaseYear);
    setDirector(movie.director);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/movies/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, releaseYear, director }),
    });
    setEditingId(null);
    setTitle("");
    setReleaseYear("");
    setDirector("");
    fetchMovies();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-1">🎬 Movie Collection</h1>
            <p className="text-purple-200">Discover and manage your favorite films</p>
          </div>
          <div className="text-right">
            <div className="text-2xl text-purple-400 font-semibold">{movies.length}</div>
            <div className="text-sm text-purple-200">Movies</div>
          </div>
        </div>
      </div>

      {/* Update Form (conditional) */}
      {editingId && (
        <div className="bg-black/40 px-6 py-4 max-w-xl mx-auto my-8 rounded-lg border border-purple-500/40">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">Edit Movie</h2>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 rounded bg-white/10 text-white"
              required
            />
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="Release Year"
              className="w-full p-2 rounded bg-white/10 text-white"
              required
            />
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="Director"
              className="w-full p-2 rounded bg-white/10 text-white"
              required
            />
            <div className="flex justify-between mt-3">
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-300">{error}</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-purple-300 text-lg">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">🎬</div>
                  <span className="text-purple-300 text-xs bg-purple-600/10 px-2 py-1 rounded">
                    #{movie.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                <p className="text-purple-200 text-sm mb-1">Year: {movie.releaseYear}</p>
                <p className="text-purple-200 text-sm">Director: {movie.director}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(movie)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

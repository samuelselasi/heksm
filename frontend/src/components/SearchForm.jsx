import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6 w-full"
    >
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-blue-50"
        placeholder="Enter keyword..."
        required
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl font-bold text-lg shadow hover:from-blue-700 transition-all duration-150 md:w-auto w-full"
        style={{ minWidth: 120 }}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

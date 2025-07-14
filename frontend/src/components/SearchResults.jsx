export default function SearchResults({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl text-gray-800 border border-blue-100 transition-all duration-300">
      <h3 className="text-lg font-bold text-blue-700 mb-2">Search Result</h3>
      <pre className="whitespace-pre-line break-words text-base">{result}</pre>
    </div>
  );
}

export default function LogsTable({ logs }) {
  if (!logs?.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl text-gray-600 text-center border border-blue-100">
        <span className="italic text-blue-600 font-semibold">No search logs found.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-4 mt-2 border border-blue-100">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Search Audit Logs</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 uppercase text-xs tracking-wider">
            <th className="px-3 py-2 text-left rounded-tl-xl">User ID</th>
            <th className="px-3 py-2 text-left">Keyword</th>
            <th className="px-3 py-2 text-left">Matches</th>
            <th className="px-3 py-2 text-left">Decrypted</th>
            <th className="px-3 py-2 text-left rounded-tr-xl">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={log.id} className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}>
              <td className="px-3 py-2 font-mono">{log.user_id}</td>
              <td className="px-3 py-2">{log.keyword}</td>
              <td className="px-3 py-2">{log.match_count}</td>
              <td className="px-3 py-2">
                <span className={log.decrypted ? "text-green-600 font-bold" : "text-gray-400"}>
                  {log.decrypted ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-3 py-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

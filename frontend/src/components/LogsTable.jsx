// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function LogsTable({ logs }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (!logs?.length) {
    return (
      <motion.div
        className="card-enhanced w-full max-w-3xl text-black text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              No Search Logs Found
            </h3>
            <p className="text-gray-900">
              Start searching to see your audit trail here.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-enhanced w-full max-w-3xl text-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-blue-700">Search Audit Logs</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 uppercase text-xs tracking-wider font-semibold">
              <th className="px-4 py-3 text-left rounded-tl-xl">User ID</th>
              <th className="px-4 py-3 text-left">Keyword</th>
              <th className="px-4 py-3 text-left">Matches</th>
              <th className="px-4 py-3 text-left">Decrypted</th>
              <th className="px-4 py-3 text-left rounded-tr-xl">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <motion.tr
                key={log.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition-colors duration-200`}
                variants={rowVariants}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
              >
                <td className="px-4 py-3 font-mono text-sm text-black">
                  {log.user_id}
                </td>
                <td className="px-4 py-3 font-medium text-black">
                  {log.keyword}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {log.match_count}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.decrypted
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {log.decrypted ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-black">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

import { User2, LogOut } from "lucide-react"; // (Optional: Requires lucide-react for icons)

export default function UserBar({ email, onLogout }) {
  return (
    <div className="w-full max-w-3xl flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-100 to-blue-50 shadow rounded-2xl mb-6 border border-blue-100">
      <span className="text-blue-700 font-semibold flex items-center gap-2">
        <User2 size={20} className="text-blue-600" />
        <span>
          Logged in as: <span className="font-bold">{email}</span>
        </span>
      </span>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-1.5 rounded-xl font-semibold flex items-center gap-1 hover:bg-red-600 transition"
        title="Logout"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

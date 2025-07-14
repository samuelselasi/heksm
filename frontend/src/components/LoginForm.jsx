import { useState } from "react";

export default function LoginForm({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white/95 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-5 text-center">
          Homomorphic Encryption-based <br /> Keyword Search
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-xs mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl font-semibold hover:from-blue-700 shadow transition-all duration-150"
          >
            Login
          </button>
        </form>
        {error && (
          <div className="text-red-500 text-sm mt-4 text-center font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import UserBar from "./components/UserBar";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import LogsTable from "./components/LogsTable";
import { Card } from "./components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";

// Utility: Decode JWT payload
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState("search"); // For programmatic tab switching

  // Set user email/id on token change
  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      setUserEmail(payload?.email || "");
      setUserId(payload?.id || null);
    } else {
      setUserEmail("");
      setUserId(null);
    }
  }, [token]);

  // Login handler
  const handleLogin = async (email, password) => {
    setLoginError("");
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
    } catch {
      setLoginError("Invalid email or password.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setResult("");
    setLogs([]);
    setView("search");
  };

  // Search handler
  const handleSearch = async (keyword) => {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      setResult(data.output || "No output.");
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  // Fetch logs
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setLogs([]);
    }
    setLoading(false);
  };

  // Show logs when switching to logs view
  useEffect(() => {
    if (view === "logs" && token) {
      fetchLogs();
    }
    // eslint-disable-next-line
  }, [view, token]);

  if (!token) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Card className="w-full max-w-3xl mx-auto shadow-2xl p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center tracking-tight">
            Homomorphic Encryption-based Keyword Search Mechanism
          </h1>
        </div>
        <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsList className="flex justify-center mb-4">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <UserBar email={userEmail} onLogout={handleLogout} />
            <Alert className="mb-5">
              <AlertTitle>Welcome, {userEmail}!</AlertTitle>
              <AlertDescription>
                Search for keywords in encrypted data. Only users with permission can decrypt results.
              </AlertDescription>
            </Alert>
            <SearchForm onSearch={handleSearch} loading={loading} />
            <SearchResults result={result} />
          </TabsContent>
          <TabsContent value="logs">
            <UserBar email={userEmail} onLogout={handleLogout} />
            <Alert className="mb-5">
              <AlertTitle>Search Audit Logs</AlertTitle>
              <AlertDescription>
                View all keyword searches performed in the system for full traceability.
              </AlertDescription>
            </Alert>
            <LogsTable logs={logs} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

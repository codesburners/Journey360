import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../services/firebase";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // ✅ redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold">Welcome Back</h2>
      <p className="text-sm text-gray-500 mt-1">
        Please enter your details to sign in to your account.
      </p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Password</label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" />
          <span>Keep me signed in for 30 days</span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social (UI only for now) */}
      <div className="flex gap-3">
        <button className="flex-1 border rounded-lg py-2 text-sm">
          Google
        </button>
        <button className="flex-1 border rounded-lg py-2 text-sm">
          Apple
        </button>
      </div>

      {/* Signup */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

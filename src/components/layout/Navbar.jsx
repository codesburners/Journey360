import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function Navbar({ isLoggedIn, currentPath }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (currentPath.startsWith('/dashboard') || currentPath.startsWith('/assistant')) return null;

  return (
    <header className="w-full px-10 py-5 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <div className="w-6 h-6 bg-blue-600 rotate-45 rounded-sm" />
        Journey360
      </div>

      {/* Right side */}
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <span className="hover:text-blue-600 cursor-pointer">Explore</span>
          <span className="hover:text-blue-600 cursor-pointer">Safety</span>
          <span className="hover:text-blue-600 cursor-pointer">Pricing</span>
          <span className="hover:text-blue-600 cursor-pointer">Help</span>
        </nav>

        {/* AUTH BUTTON LOGIC */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Logout
          </button>
        ) : currentPath === "/signup" ? (
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Create account
          </Link>
        )}
      </div>
    </header>
  );
}

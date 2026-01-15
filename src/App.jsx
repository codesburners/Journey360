import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Assistant from "./pages/assistant/Assistant";
import Navbar from "./components/layout/Navbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      // ✅ Allow / and /signup
      // ❌ Block everything else if not logged in
      if (
        !firebaseUser &&
        location.pathname !== "/" &&
        location.pathname !== "/signup"
      ) {
        navigate("/", { replace: true });
      }
    });

    return unsub;
  }, [navigate, location.pathname]);

  if (loading) return null;

  return (
    <>
      <Navbar isLoggedIn={!!user} currentPath={location.pathname} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" replace />}
        />

        <Route
          path="/assistant"
          element={user ? <Assistant /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import ShortUrlManager from "../components/ShortUrlManager";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token
    navigate("/login", { replace: true }); // Redirect and replace history
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login", { replace: true }); // Redirect to login if not authenticated
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 flex flex-col">
      <header className="w-full p-4 bg-white shadow-md flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <ShortUrlManager />
      </main>
    </div>
  );
}

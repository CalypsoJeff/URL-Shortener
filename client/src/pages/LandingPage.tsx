import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to Our URL Shortener Platform
      </h1>
      <p className="text-lg mb-12 text-center">
        Your one-stop solution for shortening and managing URLs efficiently.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-200 shadow-lg transform hover:scale-105 transition-all"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-gray-200 shadow-lg transform hover:scale-105 transition-all"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

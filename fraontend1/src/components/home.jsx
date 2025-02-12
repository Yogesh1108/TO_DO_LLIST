import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const Home = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8000"}/home/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
          toast.error("Failed to fetch data. Please try again.");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center">{message}</p>

        </div>
      </div>
      <button
          className="bg-red-500 hover:bg-red-600 text-indigo-600 font-bold py-2 px-4 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          onClick={handleLogout}
      >
        Logout
      </button>
    </div>

  );
};
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }

        await axios.post("http://localhost:8000/logout/", {refreshToken:localStorage.getItem("refresh_token")}, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(response => {
              console.log("Logout successful", response.data);
              localStorage.removeItem("token");
            })
            .catch(error => {
              console.error("Logout failed:", error.response?.data || error.message);
            });


        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete axios.defaults.headers.common["Authorization"];

        toast.success("Logged out successfully");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);

        // Still remove tokens and redirect on error
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete axios.defaults.headers.common["Authorization"];

        toast.error("Failed to logout properly, but you've been logged out locally");
        navigate("/login");
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Logging out...</p>
        </div>
      </div>
    </div>
  );
};
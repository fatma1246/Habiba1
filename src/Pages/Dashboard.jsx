import { useEffect, useState } from "react";

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState({ id: null, name: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token || ""}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUser({ id: data.id, name: data.name });
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchUserInfo();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout(); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <div className=" bg-grey-100 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="mb-2">
          <span className="font-medium">ID:</span> {user.id || "-"}
        </p>
        <p className="mb-6">
          <span className="font-medium">Name:</span> {user.name || "-"}
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

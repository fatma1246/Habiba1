import { useState, useCallback } from "react";
import login from "../assets/login.svg";
import meetus from "../assets/meetusvr 3d logo-01 2 (1).svg";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    return newErrors;
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const res = await fetch(
          "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              orgId: 2,
              isEmployee: false,
            }),
          }
        );
        if (!res.ok) throw new Error("Invalid credentials");
        const data = await res.json();
        localStorage.setItem("token", data.token);
        onLogin();
      } catch (err) {
        setErrors({ api: err.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 via-pink-50 to-purple-200 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-10">
        
        {/* Form Container */}
        <div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-6 text-center text-sm md:text-base">
            Step into our shopping metaverse for an unforgettable experience.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.api && (
              <p className="text-red-500 mb-4 text-center">{errors.api}</p>
            )}

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-2 rounded-lg font-medium text-white bg-purple-700 hover:bg-purple-400 transition-colors"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm mt-2">
              Don't have an account?{" "}
              <a href="/signup" className="text-purple-700 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>

       {/* Image Container */}
<div className="w-full md:w-1/2 relative flex justify-center items-start">
  <img src={login} alt="Login" className="w-3/4 md:w-full object-contain" />
  <img
    src={meetus}
    alt="meetus"
    className="absolute top-[90%] md:top-[70%]  w-28 md:w-70 left-1/2 transform -translate-x-1/2"
  />
</div>


      </div>
    </div>
  );
}

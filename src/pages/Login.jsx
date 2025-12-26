import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getUsers, setCurrentUser } from "../utils/auth";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("Invalid email or password ❌");
      return;
    }

    setCurrentUser(user);
    toast.success(`Welcome back, ${user.name} 👋`);

    // 🔥 Redirect back to previous page
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          required
          className="border rounded-full px-4 py-3 w-full mb-4 focus:outline-pink-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border rounded-full px-4 py-3 w-full mb-5 focus:outline-pink-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-pink-500 hover:bg-pink-600 text-white w-full py-3 rounded-full font-semibold transition">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          New user?{" "}
          <Link to="/register" className="text-pink-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

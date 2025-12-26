import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/auth";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = getUsers();

    if (users.find((u) => u.email === email)) {
      toast.error("User already exists ❌");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    toast.success("Registration successful 🎉");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          className="border rounded-full px-4 py-3 w-full mb-4 focus:outline-pink-400"
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

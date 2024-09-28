import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slices/AuthSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      return toast.error("Please fill all required fields");
    }

    const { payload } = await dispatch(login(formData));

    // console.log({payload: payload});

    if (payload === "Invalid Password" || payload === "Invalid credentials") {
      return toast.error(payload.error || "Login failed");
    }

    toast.success("Login successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {["username", "password"].map((field) => (
            <div key={field} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="p-4 bg-gray-100 rounded-md">
  <div className="mb-4">
    <p className="font-semibold">Join Our Community</p>
    <p>Sign up to explore amazing content!</p>
    <Link to="/signup" className="text-blue-600 hover:underline">
      Sign Up Now
    </Link>
  </div>
  
  <div>
    <p className="mt-2 font-semibold">Forgot Your Password?</p>
    <p>Reset it easily and get back to watching.</p>
    <Link to="/forgot-password" className="text-blue-600 hover:underline">
      Reset Password
    </Link>
  </div>
</div>


        
      </div>
    </div>
  );
};

export default Login;

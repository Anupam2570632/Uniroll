import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider/authContext";
import toast, { Toaster } from "react-hot-toast";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { setReloadUser, setReload, reload } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentId: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data) => {
    if (isAdmin) {
      axios
        .post("http://localhost:3001/adminLogin", data)
        .then((response) => {
          toast.success("Admin login successful!");
          const adminUser = { ...response.data, role: "admin" };

          Cookies.set("user", JSON.stringify(adminUser), {
            expires: 1,
          });

          setReloadUser(false);
          setReload(!reload);
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Admin Login failed!");
        });
    } else {
      axios
        .post("http://localhost:3001/studentLogin", data)
        .then((response) => {
          toast.success("login successful!");

          const studentUser = { ...response.data.user, role: "student" };

          Cookies.set("user", JSON.stringify(studentUser), {
            expires: 1,
          });

          setReloadUser(false);
          setReload(!reload);
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Login failed!");
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster position="top-right" className="z-40" reverseOrder={false} />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">
            {isAdmin ? "Admin Login" : "Student Sign Up"}
          </h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isAdmin ? "Switch to Student" : "Admin Login"}
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {isAdmin ? (
            <>
              {/* Admin Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Student ID */}
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium mb-1"
                >
                  Student ID
                </label>
                <input
                  id="studentId"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. S2025001"
                  {...register("studentId", {
                    required: "Student ID is required",
                    pattern: {
                      value: /^[A-Za-z0-9_-]{4,20}$/,
                      message: "Invalid student ID format",
                    },
                  })}
                />
                {errors.studentId && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.studentId.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full ${
              isAdmin
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-2 rounded-lg transition disabled:opacity-50`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isAdmin
                ? "Logging in..."
                : "Logging account..."
              : isAdmin
              ? "Login"
              : "Sign In"}
          </button>
          {!isAdmin && (
            <h1 className="text-center">
              Haven't any account yet
              <Link to="/signup" className="text-blue-600 hover:underline">
                {" "}
                Sign Up
              </Link>
            </h1>
          )}
        </form>
      </div>
    </div>
  );
}

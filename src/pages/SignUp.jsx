import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function StudentSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentId: "",
      name: "",
      dept_name: "",
      password: "",
    },
  });

  // Fetch department list from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/departments")
      .then((res) => setDepartments(res.data.departments))
      .catch(() => toast.error("Failed to fetch departments"));
  }, []);

  const submitHandler = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/signup", data);
      toast.success(response.data.message || "Student Created Successfully!");
      navigate("/login");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Signup failed! Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-1">Create Account</h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in your details to sign up
        </p>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
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

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name is too short" },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Department Select */}
          <div>
            <label
              htmlFor="dept_name"
              className="block text-sm font-medium mb-1"
            >
              Department Name
            </label>
            <select
              id="dept_name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              {...register("dept_name", {
                required: "Department name is required",
              })}
            >
              <option value="">Select a department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.dept_name && (
              <p className="text-sm text-red-600 mt-1">
                {errors.dept_name.message}
              </p>
            )}
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          <h1 className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              {" "}
              Sign In
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
}

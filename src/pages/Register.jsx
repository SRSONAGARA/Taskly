// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [focused, setFocused] = useState(null);

//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name) newErrors.name = "Name is required";
//     if (!form.email) newErrors.email = "Email is required";
//     if (!form.password) newErrors.password = "Password is required";
//     if (form.password && form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       console.log("Register data:", form);
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-md bg-white rounded-xl border p-6 space-y-6"
//       >
//         {/* Header */}
//         <div className="text-center space-y-1">
//           <h2 className="text-2xl font-semibold">Create an account</h2>
//           <p className="text-sm text-gray-500">Start managing your tasks efficiently</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="text-sm font-medium">Full Name</label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
//             />
//             {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
//             />
//             {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter a password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="mt-1 w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//             {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center text-gray-500">
//           Already have an account?{" "}
//           <button onClick={() => navigate("/login")} className="text-indigo-600 font-medium">
//             Login
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from "../utils/validations";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!isValidName(form.name)) {
      newErrors.name =
        "Name must be at least 2 characters and contain only letters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number & special character";
    }

    return newErrors;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      // Redirect to login on success
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.msg) {
        setApiError(err.response.data.msg);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-xl border p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">Create an account</h2>
          <p className="text-sm text-gray-500">
            Start managing your tasks efficiently
          </p>
        </div>

        {/* API Error */}
        {apiError && (
          <p className="text-sm text-red-500 text-center">{apiError}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

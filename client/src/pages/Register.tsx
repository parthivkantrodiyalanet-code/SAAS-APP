import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useApiResponseStore } from "../store/apiResponce";


interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export default function Register() {

  const [registerData, setRegisterData] = useState<RegisterProps>({
    name: "",
    email: "",
    password: ""
  });
  const { postApiResponse } = useApiResponseStore();
  const Navigate = useNavigate();

  const submitRgisterForm = async ()=>{
    console.log("Register Data:", registerData);
    const res = await postApiResponse("/user/createuser", registerData);
    console.log("Register Response:", res);
    if (res ) {
      Navigate("/login");
    } else {
      alert(res.message || "Registration failed");
    }

    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-primary text-dashboard-text-subtle px-4">
      <div className="w-full max-w-md bg-dashboard-secondary rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Create your account
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={registerData.name}
              onChange={(e)=> setRegisterData((prev)=> ({...prev, name:e.target.value}))}
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-dashboard-input-border text-white placeholder-dashboard-text-subtle focus:outline-none focus:border-dashboard-accent-blue transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={registerData.email}
              onChange={(e)=> setRegisterData((prev)=> ({...prev, email:e.target.value}))}
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-dashboard-input-border text-white placeholder-dashboard-text-subtle focus:outline-none focus:border-dashboard-accent-blue transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e)=> setRegisterData((prev)=> ({...prev, password:e.target.value}))}
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-dashboard-input-border text-white placeholder-dashboard-text-subtle focus:outline-none focus:border-dashboard-accent-blue transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-dashboard-accent-blue hover:bg-dashboard-hover-blue text-white font-medium transition-all duration-200"
            onClick={submitRgisterForm}
          >
            Register
          </button>
        </div>
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-dashboard-accent-orange hover:text-dashboard-hover-orange font-medium transition-colors"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  )
}

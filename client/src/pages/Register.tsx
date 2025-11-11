import { NavLink } from "react-router-dom"

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-primary text-dashboard-text-subtle px-4">
      <div className="w-full max-w-md bg-dashboard-secondary rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Create your account
        </h1>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
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
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-dashboard-input-border text-white placeholder-dashboard-text-subtle focus:outline-none focus:border-dashboard-accent-blue transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-dashboard-input-border text-white placeholder-dashboard-text-subtle focus:outline-none focus:border-dashboard-accent-blue transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-dashboard-accent-blue hover:bg-dashboard-hover-blue text-white font-medium transition-all duration-200"
          >
            Register
          </button>
        </form>
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

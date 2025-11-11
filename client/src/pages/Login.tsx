import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useApiResponseStore } from "../store/apiResponce";
import { useUserAuthStore } from "../store/userAuth";

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const { setIsAuthenticated } = useUserAuthStore();
    const { apiResponse, getApiResponse } = useApiResponseStore();
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    })


    useEffect(() => {
        const checkAuth = async () => {
            await getApiResponse("/user/users");
            if (apiResponse != null) {
                const auth = (apiResponse as any).authentication;
                if (auth) setIsAuthenticated(auth);
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);


    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 text-white bg-dashboard-primary">
            <div className="w-full max-w-md p-10 rounded-xl shadow-2xl bg-dashboard-secondary">
                <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-4 mb-5 rounded-lg text-white text-base bg-dashboard-primary border border-dashboard-input-border focus:outline-none focus:border-dashboard-accent-blue transition placeholder-dashboard-text-subtle"
                />

                <div className="relative mb-8">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-4 rounded-lg text-white text-base bg-dashboard-primary border border-dashboard-input-border focus:outline-none focus:border-dashboard-accent-blue transition placeholder-dashboard-text-subtle"
                    />

                    <span
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm font-semibold text-dashboard-accent-blue uppercase tracking-wider"
                    >
                        {isPasswordVisible ? "Hide" : "Show"}
                    </span>
                </div>

                <button className="w-full p-4 rounded-lg text-lg font-bold transition duration-300 bg-dashboard-accent-blue hover:bg-dashboard-hover-blue">
                    Login
                </button>

                <div className="mt-6 text-center">
                    <NavLink
                        to="/register"
                        className="text-sm font-medium transition duration-200 text-dashboard-accent-orange hover:text-dashboard-hover-orange"
                    >
                        Go to Register
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;

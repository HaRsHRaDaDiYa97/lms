import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// The following imports are commented out as they caused a resolution error.
// These dependencies need to be correctly configured in your project's features/api/authApi and node_modules.
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// Placeholder for useLoginUserMutation and useRegisterUserMutation
// In a real application, you would uncomment the imports above and remove these placeholders.



// Simple CSS for a spinner (replaces Loader2 from lucide-react)
const Spinner = () => (
    <div className="flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export const Login = () => { // Changed to default export for canvas preview
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const [activeTab, setActiveTab] = useState("login"); // State to manage active tab

    const [registerUser, { data: registerData, isSuccess: registerIsSuccess, error: registerError, isLoading: registerIsLoading }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, isSuccess: loginIsSuccess, error: loginError, isLoading: loginIsLoading }] = useLoginUserMutation();

    const navigate = useNavigate();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);

    }

   useEffect(() => {
    // Handle successful registration
    if (registerIsSuccess && registerData) {
        setTimeout(() => {
            toast.success(registerData.message || "Signup Successful.");
            setActiveTab("login"); // Switch to login tab after successful signup
            setSignupInput({ name: "", email: "", password: "" }); // Clear signup form
        }, 0);
    }

    // Handle successful login
    if (loginIsSuccess && loginData) {
        setTimeout(() => {
            toast.success(loginData.message || "Login Successful.");
            localStorage.setItem("token", loginData.token); // Optional: store token if needed
            navigate("/"); // Navigate to home on successful login
        }, 0);
    }

    // Error handling for registration
    if (registerError) {
        const errorMessage = registerError?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
        console.error("Registration Error:", registerError);
    }

    // Error handling for login
    if (loginError) {
        const errorMessage = loginError?.data?.message || "Login failed. Please check your credentials.";
        toast.error(errorMessage);
        console.error("Login Error:", loginError);
    }
}, [
    loginIsSuccess,
    registerIsSuccess,
    loginError,
    registerError,
    registerData,
    loginData,
    navigate
]);


    return (
        // Main container: centers content vertically and horizontally, adds top margin and padding
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
            {/* Inner container for the form, max width for readability on larger screens */}
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                {/* Tab list for switching between Signup and Login */}
                <div className="flex w-full rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
                    <button
                        className={`flex-1 py-3 text-sm font-medium rounded-md transition-colors duration-300
                                    ${activeTab === 'signup'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        onClick={() => setActiveTab("signup")}
                    >
                        Signup
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm font-medium rounded-md transition-colors duration-300
                                    ${activeTab === 'login'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                </div>

                {/* Conditional rendering for Signup form */}
                {activeTab === "signup" && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Signup</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Create a new account and click signup when you're done.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    name="name"
                                    value={signupInput.name}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Ex. Harsh"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    name="email"
                                    value={signupInput.email}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Ex. harsh@gmail.com"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    name="password"
                                    value={signupInput.password}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Ex. abc"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
                                            ${registerIsLoading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                                disabled={registerIsLoading}
                                onClick={() => handleRegistration("signup")}

                            >
                                {registerIsLoading ? (
                                    <>
                                        <Spinner />
                                        <span className="ml-2">Please wait</span>
                                    </>
                                ) : (
                                    "Signup"
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Conditional rendering for Login form */}
                {activeTab === "login" && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Login</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Login your password here. After signup, you'll be logged in.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Ex. harsh@gmail.com"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Ex. abc"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
                                            ${loginIsLoading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                                disabled={loginIsLoading}
                                onClick={() => handleRegistration("login")}

                            >
                                {loginIsLoading ? (
                                    <>
                                        <Spinner />
                                        <span className="ml-2">Please wait</span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

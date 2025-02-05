"use client";

import { useEffect, useState } from "react";
import TaskManager from "@/components/TaskManager";
import { useSessionContext } from "@/components/ContextProvider";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const session = useSessionContext();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load dark mode from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) {
      setDarkMode(JSON.parse(storedTheme));
    }
  }, []);

  // Apply dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch user details if session exists
  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        try {
          const result = await session.query("get_user", { account_id: session.account.id });
          if (result && typeof result === "object" && "id" in result && "name" in result) {
            setUser(result as { id: string; name: string });
          } else {
            console.error("Invalid user data:", result);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [session]);

  // Connect/Logout MetaMask function
  const handleAuth = async () => {
    if (session) {
      setUser(null);
      window.location.reload();
    } else {
      setIsConnecting(true);
      try {
        window.location.reload();
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <main className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} transition-colors duration-300`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ToDo Manager</h1>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle with Animation */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className=" rounded-full flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 transition-all"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaMoon className="text-gray-900 dark:text-white" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaSun className="text-yellow-500 " size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Connect MetaMask Button (Only shown when no session) */}
            {!session && (
              <button
                onClick={handleAuth}
                className="p-2  rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isConnecting ? "Connecting..." : "Connect MetaMask"}
              </button>
            )}

            {/* Profile Icon and Dropdown */}
            {session && user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2  rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-3 z-50">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.id}</p>
                    <button
                      onClick={handleAuth}
                      className="mt-3 w-full text-center text-sm text-red-600 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <TaskManager />
      </div>
    </main>
  );
}

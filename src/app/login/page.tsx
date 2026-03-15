"use client";

import Image from "next/image";
import Link from "next/link";
import { forgotPassword, login } from "@/lib/api/auth";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/profile");
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Enter your email to reset your password.");
      return;
    }
    try {
      await forgotPassword(email);
      alert("If an account exists with that email, a reset link has been sent.");
    } catch (error) {
      alert("Failed to send reset email. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#e2c098] flex flex-col md:flex-row items-stretch justify-center font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-[1400px] flex-1 p-4 md:p-8 gap-6 md:gap-16 md:items-stretch">
        {/* Image section */}
        <div className="relative flex-none w-full md:w-[45%] min-h-[220px] md:min-h-[80vh] rounded-xl md:rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <Image
            src="/Rectangle 1.png"
            alt="Egyptian thematic image"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Form section */}
        <div className="flex-1 flex flex-col justify-center py-6 md:py-0 md:pr-16 md:pl-8">
          <div className="w-full max-w-[500px] mx-auto md:mx-0">
            <h1 className="text-[#5B1F11] font-semibold tracking-tight leading-tight text-3xl sm:text-4xl lg:text-[3.5rem] mb-4 md:mb-6">
              Log in
            </h1>
            <p className="text-[#2b2b2b] text-base md:text-[1.1rem] mb-6 md:mb-10">
              Don&apos;t have an account ?{" "}
              <Link
                href="/signup"
                className="text-[#B36633] no-underline font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="College Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 md:px-5 md:py-4 text-base rounded-xl border-0 bg-[#B36633]/90 text-[#3b2a1a] outline-none transition-all placeholder:text-[#B36633] placeholder:opacity-80 focus:outline-2 focus:outline-[#4e2f1d] focus:outline"
                  required
                />
              </div>

              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 md:px-5 md:py-4 pr-12 text-base rounded-xl border-0 bg-[#B36633]/90 text-[#3b2a1a] outline-none transition-all placeholder:text-[#B36633] placeholder:opacity-80 focus:outline-2 focus:outline-[#4e2f1d] focus:outline"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0 w-10 h-10 flex items-center justify-center bg-transparent border-0 text-white/90 hover:text-white cursor-pointer rounded-lg"
                  aria-label="Toggle password visibility"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className="text-[#2b2b2b] text-sm md:text-base cursor-pointer hover:text-[#5B1F11] transition-colors text-left -mt-1"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>

              <button
                type="submit"
                className="w-full p-4 md:p-[1.2rem] rounded-xl text-lg md:text-[1.1rem] font-semibold border-0 cursor-pointer transition-colors bg-[#5B1F11] text-[#e2c098] hover:bg-[#43160c] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

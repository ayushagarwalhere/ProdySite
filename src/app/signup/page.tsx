"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { register } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password);
      alert("Account created. Please check your email to verify your account.");
      router.push("/login");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const axiosError = error as {
        response?: { data?: { message?: string }; status?: number };
      };
      const msg =
        axiosError.response?.data?.message ??
        (axiosError.response
          ? `Request failed (${axiosError.response.status})`
          : "Cannot reach server. Is the backend running on port 3000?");
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#E8C697] flex flex-col md:flex-row items-stretch font-sans overflow-auto">
      <div className="flex flex-col md:flex-row w-full flex-1 min-h-0">
        {/* Image section */}
        <div className="relative flex-shrink-0 w-full md:w-[45%] min-h-[280px] md:min-h-screen md:max-w-[673px] rounded-none md:rounded-[15px] overflow-hidden md:mt-8 md:ml-8 md:mb-8 md:mr-0">
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
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-[8%] md:pr-[5%] py-8 md:py-12">
          <div className="w-full max-w-[480px] mx-auto md:mx-0">
            <h1 className="text-[#4A2B1C] font-semibold tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-5">
              Create an account
            </h1>
            <p className="text-[#2b2b2b] text-base md:text-[1.1rem] mb-6 md:mb-8">
              Already have an account ?{" "}
              <Link
                href="/login"
                className="text-[#B36633] no-underline font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>

            <form className="flex flex-col gap-4 md:gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 md:py-4 text-base rounded-xl border-0 bg-[#bd865a] text-[#3b2a1a] outline-none transition-colors placeholder:text-[#4A2B1C]/70 focus:bg-[#c48c5c] focus:outline-2 focus:outline-[#4e2f1d] focus:outline"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 md:py-4 text-base rounded-xl border-0 bg-[#bd865a] text-[#3b2a1a] outline-none transition-colors placeholder:text-[#4A2B1C]/70 focus:bg-[#c48c5c] focus:outline-2 focus:outline-[#4e2f1d] focus:outline"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="College Email"
                  className="w-full px-4 py-3 md:py-4 text-base rounded-xl border-0 bg-[#bd865a] text-[#3b2a1a] outline-none transition-colors placeholder:text-[#4A2B1C]/70 focus:bg-[#c48c5c] focus:outline-2 focus:outline-[#4e2f1d] focus:outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 md:py-4 pr-12 text-base rounded-xl border-0 bg-[#bd865a] text-[#3b2a1a] outline-none transition-colors placeholder:text-[#4A2B1C]/70 focus:bg-[#c48c5c] focus:outline-2 focus:outline-[#4e2f1d] focus:outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer accent-[#4A2B1C] border-0 rounded"
                  required
                />
                <span className="text-[#2b2b2b] text-sm md:text-base">
                  I agree to the{" "}
                  <Link href="#" className="text-[#B36633] no-underline hover:underline">
                    Terms and conditions
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-4 md:py-5 rounded-xl text-base md:text-[1.1rem] font-semibold border-0 cursor-pointer transition-colors bg-[#4A2B1C] text-white/90 hover:bg-[#3A2014] hover:text-white mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

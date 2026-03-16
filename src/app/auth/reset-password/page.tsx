"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/api/auth";

type Status = "idle" | "loading" | "success" | "error";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing reset token.");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      await resetPassword(token, password);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.response?.data?.message || "Reset failed. The link may have expired.");
    }
  };

  const inputCls = "w-full px-4 py-[0.9rem] bg-[rgba(180,124,60,0.08)] border border-[rgba(180,124,60,0.25)] rounded-[4px] text-[#f0e8d6] text-[0.95rem] outline-none tracking-wide placeholder:text-[rgba(180,124,60,0.45)] focus:border-[rgba(180,124,60,0.7)] transition-colors";

  const EyeOpen = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const EyeOff = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center pt-16 pb-8 px-6">

      {/* Ambient glow */}
      <div
        className="fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(180,124,60,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div
        className="relative z-10 w-full max-w-[460px] rounded-xl border border-[rgba(180,124,60,0.2)] p-10"
        style={{ background: "linear-gradient(160deg, #0e0b06 0%, #110d07 100%)" }}
      >
        {/* Ornament */}
        <div className="flex items-center gap-2 w-full mb-8 opacity-40">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(180,124,60,0.5))" }} />
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" opacity="0.8" />
            <circle cx="5" cy="5" r="1.5" fill="#0a0703" />
          </svg>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(180,124,60,0.5))" }} />
        </div>

        {status !== "success" ? (
          <>
            {/* Key icon */}
            <div className="flex justify-center mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" opacity="0.7">
                <circle cx="8" cy="8" r="5" stroke="#b47c3c" strokeWidth="1.2" />
                <path d="M12.5 12.5L21 21" stroke="#b47c3c" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M17 17l2-2" stroke="#b47c3c" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M19 19l2-2" stroke="#b47c3c" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            <h1
              className="font-light tracking-widest uppercase text-[#f0e8d6] text-3xl mb-2 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Reset Password
            </h1>
            <p
              className="text-sm text-[rgba(180,124,60,0.65)] tracking-wide leading-relaxed mb-8 text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Enter your new password below.
            </p>

            {/* Error message */}
            {status === "error" && message && (
              <div
                className="w-full px-4 py-3 rounded-[4px] border border-[rgba(220,80,80,0.3)] bg-[rgba(220,80,80,0.07)] text-[rgba(240,160,160,0.9)] text-sm tracking-wide mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* New password */}
              <div>
                <label
                  className="block text-xs text-[rgba(180,124,60,0.5)] uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className={`${inputCls} pr-12`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[rgba(180,124,60,0.6)] hover:text-[#b47c3c] transition-colors flex items-center p-0"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  className="block text-xs text-[rgba(180,124,60,0.5)] uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    className={`${inputCls} pr-12 ${confirm && confirm !== password
                        ? "border-[rgba(220,80,80,0.5)]"
                        : confirm && confirm === password
                          ? "border-[rgba(180,124,60,0.7)]"
                          : ""
                      }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[rgba(180,124,60,0.6)] hover:text-[#b47c3c] transition-colors flex items-center p-0"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff /> : <EyeOpen />}
                  </button>
                  {/* Match indicator */}
                  {confirm.length > 0 && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      {confirm === password ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#b47c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6l12 12" stroke="rgba(220,80,80,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-[0.95rem] mt-2 border border-[#b47c3c] text-[#0a0703] text-sm font-medium uppercase tracking-[0.18em] cursor-pointer rounded-[4px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: status === "loading" ? "rgba(180,124,60,0.4)" : "#b47c3c",
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>Resetting</span>
                    <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full bg-[#0a0703] inline-block"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </span>
                  </span>
                ) : "Reset Password"}
              </button>

              <Link
                href="/login"
                className="text-center text-sm text-[rgba(180,124,60,0.5)] hover:text-[#b47c3c] tracking-wide transition-colors mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Back to Login
              </Link>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="flex flex-col items-center text-center gap-4 py-2">
            <div className="w-16 h-16 rounded-full border border-[rgba(180,124,60,0.4)] flex items-center justify-center mb-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#b47c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2
              className="text-[#f0e8d6] font-light tracking-widest uppercase text-3xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Password Reset
            </h2>
            <p
              className="text-[rgba(180,124,60,0.65)] text-sm tracking-wide leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <Link
              href="/login"
              className="w-full mt-4 py-[0.95rem] text-center border border-[#b47c3c] text-[#0a0703] text-sm font-medium uppercase tracking-[0.18em] rounded-[4px] transition-colors hover:bg-[#c98e4a] block"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "#b47c3c",
                clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
              }}
            >
              Continue to Login
            </Link>
          </div>
        )}

        {/* Bottom ornament */}
        <div className="flex items-center gap-2 w-full mt-8 opacity-25">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(180,124,60,0.5))" }} />
          <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
            <polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" />
          </svg>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(180,124,60,0.5))" }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

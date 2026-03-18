"use client";

import Image from "next/image";
import Link from "next/link";
import { forgotPassword, login } from "@/lib/api/auth";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      router.push("/Profile");
    } catch {
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForgot = () => {
    setResetSent(false);
    setResetEmail("");
    setShowForgotModal(true);
  };

  const handleResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await forgotPassword(resetEmail);
      setResetSent(true);
    } catch {
      alert("Failed to send reset email. Please try again later.");
    } finally {
      setResetLoading(false);
    }
  };

  const closeModal = () => {
    setShowForgotModal(false);
    setResetSent(false);
    setResetEmail("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

        .auth-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 40px;
          box-sizing: border-box;
        }
        .auth-inner {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 3rem;
          width: 100%;
          max-width: 1000px;
          align-items: center;
        }
        .auth-img-wrap {
          width: 420px;
          height: 560px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(180,124,60,0.2);
          position: relative;
          flex-shrink: 0;
        }
        .auth-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .auth-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(8,6,3,0.6) 100%);
        }
        .auth-form-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }
        .auth-input {
          width: 100%;
          padding: 0.9rem 1rem;
          background: rgba(180,124,60,0.08);
          border: 1px solid rgba(180,124,60,0.25);
          border-radius: 4px;
          color: #f0e8d6;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.03em;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .auth-input:focus { border-color: rgba(180,124,60,0.7); }
        .auth-input::placeholder { color: rgba(180,124,60,0.45); }
        .auth-btn {
          width: 100%;
          padding: 0.95rem;
          background: #b47c3c;
          border: 1px solid #b47c3c;
          border-radius: 4px;
          color: #0a0703;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          cursor: pointer;
          transition: background 0.2s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .auth-btn:hover { background: #c98e4a; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ornament { display: flex; align-items: center; gap: 8px; opacity: 0.5; margin-bottom: 2rem; }
        .ornament-line-l { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(180,124,60,0.5)); }
        .ornament-line-r { flex: 1; height: 1px; background: linear-gradient(to left, transparent, rgba(180,124,60,0.5)); }

        @media (max-width: 768px) {
          .auth-inner { grid-template-columns: 1fr; }
          .auth-img-wrap { width: 100%; height: 260px; }
        }
      `}</style>

      <div className="auth-page">

        {/* Ambient glow */}
        <div style={{
          position: "fixed", top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,124,60,0.07) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Forgot Password Modal ── */}
        {showForgotModal && (
          <div
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 1rem",
              background: "rgba(4,3,2,0.85)",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div style={{
              position: "relative", width: "100%", maxWidth: 420,
              borderRadius: 12, border: "1px solid rgba(180,124,60,0.25)",
              padding: "2rem",
              background: "linear-gradient(160deg, #0e0b06 0%, #110d07 100%)",
            }}>
              <button
                onClick={closeModal}
                style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", cursor: "pointer", color: "rgba(180,124,60,0.5)", padding: 4 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="ornament">
                <div className="ornament-line-l" />
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" opacity="0.8" />
                  <circle cx="5" cy="5" r="1.5" fill="#0a0703" />
                </svg>
                <div className="ornament-line-r" />
              </div>

              {!resetSent ? (
                <>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <svg width="44" height="32" viewBox="0 0 44 32" fill="none" opacity="0.7">
                      <path d="M2 16 Q22 2 42 16 Q22 30 2 16Z" stroke="#b47c3c" strokeWidth="1.2" fill="none" />
                      <circle cx="22" cy="16" r="7" stroke="#b47c3c" strokeWidth="1" fill="none" />
                      <circle cx="22" cy="16" r="3" fill="#b47c3c" opacity="0.8" />
                    </svg>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f0e8d6", fontSize: "1.5rem", textAlign: "center", marginBottom: "0.5rem" }}>
                    Reset Password
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(180,124,60,0.6)", textAlign: "center", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    Enter your email and we&apos;ll send you a reset link.
                  </p>
                  <form onSubmit={handleResetSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {/* Email only — not pre-filled from username */}
                    <input
                      type="email"
                      placeholder="Email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="auth-input"
                    />
                    <button type="submit" disabled={resetLoading} className="auth-btn">
                      {resetLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem", padding: "1rem 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(180,124,60,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#b47c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f0e8d6", fontSize: "1.5rem" }}>
                    Link Sent
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(180,124,60,0.6)", lineHeight: 1.6 }}>
                    If an account exists for <span style={{ color: "#b47c3c" }}>{resetEmail}</span>, a reset link has been sent. Check your inbox.
                  </p>
                  <button onClick={closeModal} className="auth-btn" style={{ marginTop: "0.5rem" }}>
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Main layout ── */}
        <div className="auth-inner" style={{ position: "relative", zIndex: 1 }}>

          {/* Image */}
          <div className="auth-img-wrap">
            <Image
              src="/Rectangle 1.png"
              alt="Egyptian thematic image"
              width={420}
              height={560}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              priority
            />
            <div className="auth-img-overlay" />
          </div>

          {/* Form */}
          <div className="auth-form-wrap">
            <div className="ornament">
              <div className="ornament-line-l" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" opacity="0.8" />
                <circle cx="5" cy="5" r="1.5" fill="#0a0703" />
              </svg>
              <div className="ornament-line-r" />
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f0e8d6", fontSize: "clamp(2.5rem, 4vw, 3.2rem)", margin: "0 0 0.5rem" }}>
              Log in
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(180,124,60,0.7)", marginBottom: "2rem" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ color: "#b47c3c", fontWeight: 500, borderBottom: "1px solid rgba(180,124,60,0.4)", paddingBottom: 1 }}>
                Sign up
              </Link>
            </p>

            <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>

              {/* Username field */}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="auth-input"
              />

              {/* Password field */}
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="auth-input"
                  style={{ paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "rgba(180,124,60,0.6)", display: "flex", alignItems: "center", padding: 0 }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Forgot password — opens modal, does NOT pre-fill email */}
              <button
                type="button"
                onClick={handleOpenForgot}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(180,124,60,0.6)", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", textAlign: "left", padding: 0, marginTop: "-0.25rem" }}
              >
                Forgot Password?
              </button>

              <button type="submit" disabled={loading} className="auth-btn" style={{ marginTop: "0.5rem" }}>
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

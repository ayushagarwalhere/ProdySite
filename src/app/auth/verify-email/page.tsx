"use client";

import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api/axios";

type Status = "idle" | "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleVerify = useCallback(async () => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }
    setStatus("loading");
    try {
      await api.get(`/auth/verify-email?token=${token}`);
      setStatus("success");
      setMessage("Your email has been verified successfully.");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Verification failed. The link may have expired."
      );
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      handleVerify();
    } else {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
    }
  }, [token, handleVerify]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
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
          text-align: center;
          display: block;
          text-decoration: none;
        }
        .auth-btn:hover { background: #c98e4a; }
        .auth-btn-outline {
          width: 100%;
          padding: 0.9rem;
          background: transparent;
          border: 1px solid rgba(180,124,60,0.3);
          border-radius: 4px;
          color: #b47c3c;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          cursor: pointer;
          transition: border-color 0.2s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          text-align: center;
          display: block;
          text-decoration: none;
        }
        .auth-btn-outline:hover { border-color: #b47c3c; }
        .ornament { display: flex; align-items: center; gap: 8px; opacity: 0.4; margin-bottom: 2rem; width: 100%; }
        .ornament-line-l { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(180,124,60,0.5)); }
        .ornament-line-r { flex: 1; height: 1px; background: linear-gradient(to left, transparent, rgba(180,124,60,0.5)); }
      `}</style>

      <div style={{
        minHeight: "100vh", width: "100%", background: "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 24px 40px", boxSizing: "border-box",
      }}>

        {/* Ambient glow */}
        <div style={{
          position: "fixed", top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,124,60,0.07) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 460,
          borderRadius: 12, border: "1px solid rgba(180,124,60,0.2)",
          padding: "2.5rem",
          background: "linear-gradient(160deg, #0e0b06 0%, #110d07 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center",
        }}>

          <div className="ornament">
            <div className="ornament-line-l" />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" opacity="0.8" />
              <circle cx="5" cy="5" r="1.5" fill="#0a0703" />
            </svg>
            <div className="ornament-line-r" />
          </div>

          {/* Icon */}
          {status === "loading" && (
            <div style={{ marginBottom: "1.5rem" }}>
              <svg width="52" height="38" viewBox="0 0 52 38" fill="none" style={{ animation: "bounce 1.5s ease-in-out infinite" }}>
                <path d="M2 19 Q26 2 50 19 Q26 36 2 19Z" stroke="#b47c3c" strokeWidth="1.2" fill="none" opacity="0.6" />
                <circle cx="26" cy="19" r="8" stroke="#b47c3c" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="26" cy="19" r="3.5" fill="#b47c3c" opacity="0.7" />
              </svg>
            </div>
          )}
          {status === "success" && (
            <div style={{ marginBottom: "1.5rem", width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(180,124,60,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#b47c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {(status === "error" || status === "idle") && (
            <div style={{ marginBottom: "1.5rem" }}>
              <svg width="52" height="38" viewBox="0 0 52 38" fill="none" opacity="0.6">
                <path d="M2 19 Q26 2 50 19 Q26 36 2 19Z" stroke="#b47c3c" strokeWidth="1.2" fill="none" />
                <circle cx="26" cy="19" r="8" stroke="#b47c3c" strokeWidth="1" fill="none" />
                <circle cx="26" cy="19" r="3.5" fill="#b47c3c" opacity="0.5" />
              </svg>
            </div>
          )}

          {/* Heading */}
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f0e8d6", fontSize: "1.8rem", margin: "0 0 0.75rem" }}>
            {status === "loading" && "Verifying..."}
            {status === "success" && "Email Verified"}
            {status === "error" && "Verification Failed"}
            {status === "idle" && "Verify Email"}
          </h1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(180,124,60,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {status === "loading" && "Please wait while we verify your email address..."}
            {status === "success" && message}
            {status === "error" && message}
            {status === "idle" && "Click the button below to verify your email address."}
          </p>

          {/* Loading dots */}
          {status === "loading" && (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#b47c3c", opacity: 0.7,
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  display: "inline-block",
                }} />
              ))}
            </div>
          )}

          {status === "idle" && (
            <button onClick={handleVerify} className="auth-btn">Verify Email</button>
          )}

          {status === "success" && (
            <Link href="/login" className="auth-btn">Continue to Login</Link>
          )}

          {status === "error" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
              <button onClick={handleVerify} className="auth-btn">Try Again</button>
              <Link href="/login" className="auth-btn-outline">Back to Login</Link>
            </div>
          )}

          {/* Bottom ornament */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", marginTop: "2rem", opacity: 0.25 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(180,124,60,0.5))" }} />
            <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
              <polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" />
            </svg>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(180,124,60,0.5))" }} />
          </div>
        </div>
      </div>
    </>
  );
}

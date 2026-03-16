"use client";

import Image from "next/image";
import Link from "next/link";
import { register } from "@/lib/api/auth";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) { alert("Please agree to the Terms and Conditions."); return; }
    setLoading(true);
    try {
      await register(form.username, form.name, form.email, form.password);
      router.push("/Profile");
    } catch {
      alert("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
          height: 600px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(180,124,60,0.2);
          position: relative;
          flex-shrink: 0;
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
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

        @media (max-width: 768px) {
          .auth-inner { grid-template-columns: 1fr; }
          .auth-img-wrap { width: 100%; height: 260px; }
        }
        @media (max-width: 480px) {
          .two-col { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="auth-page">

        <div style={{
          position: "fixed", top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,124,60,0.07) 0%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }} />

        <div className="auth-inner" style={{ position: "relative", zIndex: 1 }}>

          {/* Image */}
          <div className="auth-img-wrap">
            <Image
              src="/Rectangle 1.png"
              alt="Egyptian thematic image"
              width={420}
              height={600}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              priority
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(8,6,3,0.6) 100%)" }} />
          </div>

          {/* Form */}
          <div className="auth-form-wrap">
            <div className="ornament">
              <div className="ornament-line-l" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="5,0 10,5 5,10 0,5" fill="#b47c3c" opacity="0.8" /><circle cx="5" cy="5" r="1.5" fill="#0a0703" /></svg>
              <div className="ornament-line-r" />
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f0e8d6", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 0.5rem" }}>
              Create an account
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(180,124,60,0.7)", marginBottom: "2rem" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#b47c3c", fontWeight: 500, borderBottom: "1px solid rgba(180,124,60,0.4)", paddingBottom: 1 }}>
                Log in
              </Link>
            </p>

            <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>
              <div className="two-col">
                <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="auth-input" />
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="auth-input" />
              </div>

              <input type="email" name="email" placeholder="College Email" value={form.email} onChange={handleChange} required className="auth-input" />

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" placeholder="Enter your password"
                  value={form.password} onChange={handleChange}
                  required className="auth-input" style={{ paddingRight: "3rem" }}
                />
                <button
                  type="button" onClick={() => setShowPassword(v => !v)}
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


              <button type="submit" disabled={loading} className="auth-btn" style={{ marginTop: "0.5rem" }}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
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
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageSection}>
          <Image
            src="/Rectangle 1.png"
            alt="Egyptian thematic image"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={styles.bgImage}
            priority
          />
        </div>

        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Log in</h1>
            <p className={styles.subtitle}>
              Don&apos;t have an account ?{" "}
              <Link href="/signup" className={styles.link}>
                Sign up
              </Link>
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="College Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                <button type="button" className={styles.eyeBtn}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg "
                  >
                    <path
                      d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <p className={styles.subtitle} onClick={handleForgotPassword}>
                Forgot Password?
              </p>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

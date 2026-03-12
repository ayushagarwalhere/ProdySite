import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function SignupPage() {
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
                        <h1 className={styles.title}>Create an account</h1>
                        <p className={styles.subtitle}>
                            Already have an account ? <Link href="/login" className={styles.link}>Log in</Link>
                        </p>

                        <form className={styles.form}>
                            <div className={styles.nameRow}>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className={styles.input}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    placeholder="College Email"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={styles.input}
                                    required
                                />
                                <button type="button" className={styles.eyeBtn}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>

                            <label className={styles.checkboxGroup}>
                                <input type="checkbox" className={styles.checkbox} required />
                                <span className={styles.checkboxText}>
                                    I agree to the <Link href="#" className={styles.linkTerms}>Terms and conditions</Link>
                                </span>
                            </label>

                            <button type="submit" className={styles.submitBtn}>
                                Create account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

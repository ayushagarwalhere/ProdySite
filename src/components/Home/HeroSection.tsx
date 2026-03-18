// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// export default function HeroSection() {
//   const [visible, setVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 200);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       style={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//         background: "var(--bg-primary)",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       {/* Ambient glow */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           pointerEvents: "none",
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "600px",
//             height: "600px",
//             borderRadius: "50%",
//             opacity: 0.15,
//             background:
//               "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
//             filter: "blur(80px)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: "20%",
//             right: "10%",
//             width: "200px",
//             height: "200px",
//             borderRadius: "50%",
//             opacity: 0.1,
//             background:
//               "radial-gradient(circle, var(--emerald) 0%, transparent 70%)",
//             filter: "blur(60px)",
//           }}
//         />
//       </div>

//       {/* Floating gold particles */}
//       {Array.from({ length: 15 }).map((_, i) => (
//         <div
//           key={`hero-p-${i}`}
//           style={{
//             position: "absolute",
//             width: "2px",
//             height: "2px",
//             borderRadius: "50%",
//             background: "var(--gold)",
//             left: `${10 + Math.random() * 80}%`,
//             bottom: "0",
//             animation: `particle-float ${5 + Math.random() * 6}s ease-in-out infinite`,
//             animationDelay: `${Math.random() * 5}s`,
//             opacity: 0,
//           }}
//         />
//       ))}

//       {/* Main content */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 10,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "2rem",
//           padding: "0 1.5rem",
//         }}
//       >
//         {/* Logo */}
//         <div
//           style={{
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(40px)",
//             transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
//             animation: visible ? "float-gentle 6s ease-in-out infinite" : undefined,
//           }}
//         >
//           <Image
//             src="/logo.png"
//             alt="Prody Logo"
//             width={120}
//             height={120}
//             style={{ objectFit: "contain" }}
//             priority
//           />
//         </div>

//         {/* Title */}
//         <h1
//           style={{
//             fontSize: "clamp(3rem, 8vw, 6rem)",
//             fontWeight: 200,
//             textTransform: "uppercase",
//             textAlign: "center",
//             color: "var(--foreground)",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(60px)",
//             letterSpacing: visible ? "0.3em" : "0.5em",
//             transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
//             margin: 0,
//           }}
//         >
//           Prody
//         </h1>

//         {/* Decorative line */}
//         <div
//           style={{
//             height: "1px",
//             overflow: "hidden",
//             background: "var(--gold)",
//             width: visible ? "120px" : "0px",
//             transition: "width 1s ease 0.8s",
//           }}
//         />

//         {/* Subtitle */}
//         <p
//           style={{
//             fontSize: "clamp(1rem, 2vw, 1.25rem)",
//             fontWeight: 300,
//             letterSpacing: "0.25em",
//             textTransform: "uppercase",
//             textAlign: "center",
//             color: "var(--gold)",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(30px)",
//             transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.9s",
//             margin: 0,
//           }}
//         >
//           The Alchemical Renaissance
//         </p>

//         {/* Year / tagline */}
//         <p
//           style={{
//             fontSize: "0.875rem",
//             fontWeight: 300,
//             letterSpacing: "0.15em",
//             textAlign: "center",
//             maxWidth: "28rem",
//             color: "var(--muted)",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(20px)",
//             transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 1.2s",
//             margin: 0,
//           }}
//         >
//           Where ancient wisdom meets modern innovation — 2026
//         </p>

//         {/* CTA */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "1.5rem",
//             marginTop: "1rem",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(20px)",
//             transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 1.5s",
//           }}
//         >
//           <a
//             href="/events"
//             style={{
//               padding: "0.75rem 2rem",
//               fontSize: "0.875rem",
//               textTransform: "uppercase",
//               letterSpacing: "0.2em",
//               fontWeight: 300,
//               border: "1px solid var(--gold)",
//               color: "var(--gold)",
//               background: "transparent",
//               textDecoration: "none",
//               transition: "all 0.3s ease",
//               cursor: "pointer",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "var(--gold)";
//               e.currentTarget.style.color = "var(--bg-primary)";
//               e.currentTarget.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "transparent";
//               e.currentTarget.style.color = "var(--gold)";
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             Explore Events
//           </a>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "2.5rem",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "0.5rem",
//           opacity: visible ? 0.5 : 0,
//           transition: "opacity 1s ease 2s",
//           animation: visible ? "float-gentle 3s ease-in-out infinite" : undefined,
//         }}
//       >
//         <span
//           style={{
//             fontSize: "0.75rem",
//             letterSpacing: "0.3em",
//             textTransform: "uppercase",
//             color: "var(--gold-dark)",
//           }}
//         >
//           Scroll
//         </span>
//         <div
//           style={{
//             width: "1px",
//             height: "2rem",
//             background: "var(--gold-dark)",
//           }}
//         />
//       </div>
//     </section>
//   );
// }

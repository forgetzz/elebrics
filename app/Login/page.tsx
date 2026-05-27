"use client";
import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Turnstile from "react-turnstile";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Code2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lihatPassword, setLihatPassword] = useState(false);
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState("");
  const { user } = useAuth()


  useEffect(() => {
    if (user) {
      router.replace("../Home")
    }
  }, [])
  const handleLogin = async () => {
    if (!captchaToken) {
      return alert("Captcha belum siap");
    }

    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Username dan password harus diisi.");
      setLoading(false);
      return;
    }

    try {
      // cek captcha di backend
      const captchaRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          captchaToken,
        }),
      });

      const captchaData = await captchaRes.json();

      if (!captchaData.success) {
        throw new Error("Captcha gagal.");
      }

      // cari username di firestore
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error("Username tidak ditemukan.");
      }

      const userData = snapshot.docs[0].data();

      await signInWithEmailAndPassword(
        auth,
        userData.email,
        password
      );

      router.replace("/Home");

    } catch (err) {
      let errorMessage =
        "Terjadi kesalahan saat login.";

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            errorMessage =
              "Username atau password salah.";
            break;

          case "auth/invalid-email":
            errorMessage = "Email tidak valid.";
            break;

          case "auth/too-many-requests":
            errorMessage =
              "Terlalu banyak percobaan. Coba lagi nanti.";
            break;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex bg-[#050A05]">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 100, 38, 0.5)1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(220, 38, 38, 0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-red-400 flex items-center justify-center">
              <img src="/logo/logo.png" alt="" />
            </div>
            <span className="text-white font-black text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
              Elbric<span className="text-red-400">Music</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/8 text-red-400 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Platform Distribusi music #1 Indonesia
          </div>
          <h2
            className="text-5xl font-black leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-white">Selamat</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fecaca 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Datang Kembali
            </span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-xs">
            Distribusikan Musicmu Secara Global
          </p>
        </div>



        {/* Vertical line accent */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-sm">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg bg-red-400 flex items-center justify-center">
              <img src="/logo/logo.png" alt="" />
            </div>
            <span className="text-white font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
              Elbric<span className="text-red-400">Music</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black text-white mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Masuk
            </h1>
            <p className="text-gray-500 text-sm">Masukkan kredensial akun kamu</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm leading-snug">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Username kamu"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid rgba(220, 38, 38, 0.5)";
                e.currentTarget.style.background = "rgba(74,222,128,0.04)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={lihatPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Password kamu"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(220, 38, 38, 0.5)";
                  e.currentTarget.style.background = "rgba(74,222,128,0.04)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              />
              <button
                type="button"
                onClick={() => setLihatPassword(!lihatPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors p-1"
                aria-label={lihatPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {lihatPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Turnstile className="p-5 flex justify-center items-center mt-5"
              sitekey={
                process.env
                  .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
              }
              onVerify={(token) => {
                setCaptchaToken(token);
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            style={{
              background: loading ? "#ef4444" : "linear-gradient(135deg, #f87171, #fecaca)",
              boxShadow: "0 0 24px rgba(220, 38, 38, 0.5)",
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Memuat...
              </>
            ) : (
              <>
                Masuk Sekarang
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-gray-700 text-xs">atau</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <p className="text-center text-gray-600 text-sm">
            Belum punya akun?{" "}
            <Link href="/singup" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>

      {/* Font */}

    </div>
  );
}
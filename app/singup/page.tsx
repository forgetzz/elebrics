"use client";

import React, { useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Code2, AlertCircle, CheckCircle2, User, Mail, Phone, Lock, Building2, CreditCard, Wallet, AtSign, Users, Music } from "lucide-react";
import { Register } from "@/service/register";
import { registerType } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import Bubble from "@/components/ui/Bubble";

const BANKS = ["BCA", "BRI", "BNI", "Mandiri", "CIMB", "Danamon"];

const fields: {
  key: keyof registerType;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ReactNode;
  hint?: string;
}[] = [
    { key: "name", label: "Nama Lengkap", placeholder: "Nama lengkap kamu", type: "text", icon: <User size={14} /> },
    { key: "email", label: "Email", placeholder: "Email aktif kamu", type: "email", icon: <Mail size={14} /> },
    { key: "username", label: "Username", placeholder: "Contoh: ASB_001", type: "text", icon: <AtSign size={14} /> },
    { key: "whatsapp", label: "WhatsApp", placeholder: "08xxxxxxxxxx", type: "tel", icon: <Phone size={14} /> },
    { key: "rekening", label: "Nomor Rekening", placeholder: "Contoh: 1234567890", type: "text", icon: <CreditCard size={14} /> },
    { key: "namaRekening", label: "nama Rekening", placeholder: "nama rekening...", type: "text", icon: <Users size={14} />, hint: "nama rekening anda" },
  ];

export default function MitraRegisterPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [lihatPassword, setLihatPassword] = useState(false);
  const [form, setForm] = useState<registerType>({
    name: "", email: "", password: "", namaRekening: "",
    whatsapp: "", bank: "", username: "", rekening: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await Register({ ...form });
      setSuccess("Registrasi berhasil! Akun kamu sudah aktif.");
    } catch {
      setError("Terjadi kesalahan saat proses registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A05] flex">
      {/* buble */}
   <Bubble/>
      {/* buble */}
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] p-12 relative overflow-hidden border-r border-white/5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 75% 55% at 25% 20%, rgba(74,222,128,0.13) 0%, transparent 70%)" }}
        />

        <Link href="/" className="relative z-10 flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-red-400 flex items-center justify-center">
            <Music className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-white font-black text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
            Elbric<span className="text-red-400"> Music Production</span>
          </span>
        </Link>

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/8 text-red-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Bergabung Sekarang
          </div>
          <h2 className="text-5xl font-black leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            <span className="text-white block">Daftar &</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #FF0000 0%, #FF0031 50%, #FF000023 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mulai Produksi Musik
            </span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Buat akun gratis dan bergabung dengan lebih dari 12.000 Musisi .
          </p>

          {/* Benefit list */}

        </div>

        <div className="relative z-10 flex gap-8">
          {[["50+", "Courses"], ["12K+", "Students"], ["4.9★", "Rating"]].map(([val, label]) => (
            <div key={label}>
              <div className="text-white font-black text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>{val}</div>
              <div className="text-gray-600 text-xs uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-6 lg:p-12">
          <div className="w-full max-w-md py-6">

            {/* Mobile Logo */}
            <Link href="/" className="flex lg:hidden items-center gap-2 mb-8 w-fit">
              <div className="w-7 h-7 rounded-lg bg-red-400 flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-white font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                Elbric<span className="text-red-400">Music Production</span>
              </span>
            </Link>

            <div className="mb-7">
              <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Buat Akun
              </h1>
              <p className="text-gray-500 text-sm">Lengkapi semua data untuk mendaftar sebagai mitra</p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Text fields */}
              {fields.map(({ key, label, placeholder, type, icon, hint }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                      {icon}
                    </div>
                    <input
                      name={key}
                      type={type ?? "text"}
                      placeholder={placeholder}
                      value={form[key] as string}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.border = "1px solid rgba(74,222,128,0.4)";
                        e.currentTarget.style.background = "rgba(74,222,128,0.04)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }}
                    />
                  </div>
                  {hint && <p className="text-xs text-gray-600 mt-1.5">{hint}</p>}
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                    <Lock size={14} />
                  </div>
                  <input
                    name="password"
                    type={lihatPassword ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-12 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(74,222,128,0.4)";
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
                    {lihatPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Bank Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                  Bank
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                    <Building2 size={14} />
                  </div>
                  <select
                    name="bank"
                    value={form.bank}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: form.bank ? "#fff" : "#4b5563",
                    }}
                  >
                    <option value="" style={{ background: "#0d1a0d", color: "#9ca3af" }}>Pilih bank kamu</option>
                    {BANKS.map((b) => (
                      <option key={b} value={b} style={{ background: "#0d1a0d", color: "#fff" }}>{b}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>



            </div>

            {/* Submit */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="group mt-7 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #FF0000, #FF090022)",
                boxShadow: "0 0 24px rgba(74,222,128,0.28)",
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-black" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Mendaftar...
                </>
              ) : (
                <>
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/6" />
              <span className="text-gray-700 text-xs">atau</span>
              <div className="flex-1 h-px bg-white/6" />
            </div>

            <p className="text-center text-gray-600 text-sm">
              Sudah punya akun?{" "}
              <Link href="/Login" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                Login di sini
              </Link>
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
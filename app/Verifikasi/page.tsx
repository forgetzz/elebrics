import React from "react";
import Link from "next/link";
import { ShieldAlert, Clock3, ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[140px]" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-red-500/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-black text-center text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Akun Belum
            <span className="block text-red-400">
              Terverifikasi
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-center text-sm leading-relaxed mt-5">
            Maaf, akun kamu saat ini masih dalam proses pengecekan oleh admin.
            Silakan tunggu sampai proses verifikasi selesai agar semua fitur
            bisa digunakan. Karena ternyata manusia masih suka memverifikasi
            manusia lain secara manual di tahun modern ini.
          </p>

          {/* Status Box */}
          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Clock3 className="w-5 h-5 text-yellow-400" />
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm">
                Status Verifikasi
              </h3>

              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                Admin sedang meninjau data akun dan dokumen yang kamu kirimkan.
                Proses biasanya membutuhkan beberapa waktu tergantung antrean.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #ff1744 0%, #ff0055 100%)",
                boxShadow: "0 0 30px rgba(255,0,85,0.25)",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Jika proses terlalu lama, silakan hubungi admin untuk bantuan lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
}
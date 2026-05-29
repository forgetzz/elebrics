"use client";
import { UserData } from "../../types/index"
import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Camera, Save, X, Pencil, LogOut, User, Link, Phone, Building2, CreditCard, Wallet } from "lucide-react";
import { signOut } from "firebase/auth";
import { useTheme } from "@/hooks";



const FIELDS = [
    { label: "Nama", key: "name", icon: User },
    { label: "WhatsApp", key: "whatsapp", icon: Phone },
    { label: "Bank", key: "bank", icon: Building2 },
    { label: "No Rekening", key: "rekening", icon: CreditCard },
];

function getInitials(name: string) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : name.substring(0, 2).toUpperCase();
}

export default function ProfilePage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userData, setUserData] = useState<UserData>({
        name: "", sponsorUsername: "", email: "",
        bank: "", rekening: "", whatsapp: "",
        imageProfile: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserData>(userData);
    const {ThemeHelper} = useTheme()

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data() as UserData;
                setUserData(data);
                setFormData(data);
            }
        };
        fetchUserData();
    }, []);





    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/Login";
        } catch {
            alert("Gagal logout");
        }
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();
        const cleanData = {
            name: formData.name, email: formData.email,
            bank: formData.bank, rekening: formData.rekening,
            whatsapp: formData.whatsapp, imageProfile: formData.imageProfile,

        };
        try {
            const res = await fetch("https://backend-production-74f5a.up.railway.app/update/update2", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(cleanData),
            });
            if (!res.ok) throw new Error("Request gagal");
        } catch (err: any) {
            console.error("ERROR:", err.message);
        }
        setUserData(formData);
        setIsEditing(false);
    };

    return (
        <div
            className="min-h-screen pb-24 px-5 pt-7 relative overflow-hidden"
            style={{ background: "", fontFamily: "'', sans-serif" }}
        >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-10 -right-12 w-64 h-64 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />

            {/* Page label */}
            <p className="mb-5 text-xs uppercase tracking-widest"
                style={{ fontFamily: "'DM Mono', monospace", color: `${ThemeHelper.TextColor}`, letterSpacing: "0.2em" }}>
        // profile
            </p>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-7">
                <div className="relative mb-3" style={{
                    padding: 3, borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF0000, #FF002354)"
                }}>
                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                        style={{ background: `${ThemeHelper.ThemeBgPrimary}` }}>
                        {userData.imageProfile ? (
                            <img src={userData.imageProfile} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-black" style={{ color: `${ThemeHelper.TextColor}` }}>
                                {userData.name ? getInitials(userData.name) : "?"}
                            </span>
                        )}
                    </div>
                    {/* <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                        style={{ background: "#052e16", border: "2px solid #020c04" }}
                    >
                        <Camera size={12} color="#FF0000" />
                    </button> */}
                    <input type="file" accept="image/*" ref={fileInputRef}
                        className="hidden" />
                </div>

                <h1 className="text-xl font-black mb-0.5" style={{ color: `${ThemeHelper.TextColor}` }}>
                    {userData.name || "—"}
                </h1>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: `${ThemeHelper.TextColor}` }}>
                    {userData.email || "—"}
                </p>
            </div>

            {/* Info Card */}
            <div className="rounded-2xl mb-4 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Top line accent */}
                <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.5), transparent)" }} />

                <div className="px-5 pt-5 pb-3">
                    <p className="mb-4 flex items-center gap-2"
                        style={{
                            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em",
                           color: `${ThemeHelper.TextColor}`, textTransform: "uppercase"
                        }}>
                        informasi akun
                        <span className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                    </p>



                    {/* Dynamic fields */}
                    {FIELDS.map((field, i) => {
                        const Icon = field.icon;
                        const isLast = i === FIELDS.length - 1;
                        const isEVM = field.key === "addressEVM";
         
                        return (
                            <div key={field.key}
                                className={`flex items-center py-2.5 ${!isLast ? "border-b" : ""}`}
                                style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                                    style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.12)" }}>
                                    <Icon size={12} color="#166534" />
                                </div>
                                <span className="min-w-[80px] uppercase"
                                    style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: `${ThemeHelper.TextColor}`, letterSpacing: "0.08em" }}>
                                    {field.label}
                                </span>
                                {isEditing ? (
                                    <input
                                        value={formData[field.key as keyof UserData]}
                                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                        className="flex-1 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-all"
                                        style={{
                                            background: "rgba(233, 38, 38, 0.5)", border: "1px solid rgba(220, 38, 38, 0.5)",
                                            color: "#FF0000", fontFamily: "'Syne', sans-serif"
                                        }}
                                    />
                                ) : (
                                    <span className="flex-1 font-bold break-all"
                                        style={{
                                            fontSize: isEVM ? 11 : 13, color: isEVM ? "#FF0000" : "#FF0023",
                                            fontFamily: isEVM ? "'DM Mono', monospace" : "'Syne', sans-serif"
                                        }}>
                                        {userData[field.key as keyof UserData] || "—"}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Buttons */}
            {isEditing ? (
                <div className="flex gap-3">
                    <button onClick={handleSave} className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                        style={{
                            background: "linear-gradient(135deg, #166534, #15803d)",
                            border: "1px solid rgba(74,222,128,0.2)", color: "#dcfce7"
                        }}>
                        <Save size={15} /> Simpan
                    </button>
                    <button onClick={() => { setFormData(userData); setIsEditing(false); }}
                        className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#4b5563" }}>
                        <X size={15} /> Batal
                    </button>
                </div>
            ) : (
                <div className="flex gap-3 mb-7">
                    <button onClick={() => setIsEditing(true)}
                        className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                        style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80" }}>
                        <Pencil size={15} /> Edit Profil
                    </button>
                    <button onClick={handleLogout}
                        className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", color: "#f87171" }}>
                        <LogOut size={15} /> Logout
                    </button>
                </div>
            )}
        </div>
    );
}
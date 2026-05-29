"use client"
import { Home, Upload, BarChart2, User, Moon, Sun, UploadIcon, BanknoteArrowDown } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import styles from "./Home.module.css"
import { TabKey, tabStrategies } from "@/constants/Tabkey";
import { useTabStore } from "@/store/useTabStore";
import { Colors } from "@/utils";
import { useAuth } from "@/hooks";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Datas } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const nav_items: { key: TabKey; icon: React.ReactNode; label: string }[] = [
    { key: "home", icon: <Home size={19} />, label: "Beranda" },
    { key: "withdraw", icon: <BanknoteArrowDown size={19} />, label: "Withdraw" },
    { key: "upload", icon: <UploadIcon  size={22} />, label: "Upload" },
    { key: "profile", icon: <User size={19} />, label: "Profil" },
]
export default function DashboardLayout() {
    const { activeTab, setActiveTab } = useTabStore();
    const router = useRouter()
    const { Isdarks, themeToggle, ThemeHelper } = useTheme();
    const [verifikasi, setVerifikasi] = useState<boolean | null>(null);
    const { user } = useAuth()



    useEffect(() => {
        if (!user) return;

        const unsub = onSnapshot(
            doc(db, "users", user.uid),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data() as Datas;

                    setVerifikasi(data.verifikasi);
                    console.log(verifikasi)
                }
            }
        );

        if (verifikasi === false) {
            router.replace("../Verifikasi")
        }

        return () => unsub();
    }, [user]);


    return (
        <div className={`${styles.root} ${ThemeHelper.ThemeBgPrimary}`}>
            <main className={styles.main}>{tabStrategies[activeTab]}</main>

            <nav className={`${styles.bottomNav} ${ThemeHelper.ThemeBgPrimary}`}>
                {nav_items.map(({ key, icon, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`${styles.navBtn} ${activeTab === key ? styles.navActive : ""}`}
                        aria-label={label}
                    >
                        <div className={styles.navPill} />
                        {icon}
                        <span className={styles.navLabel}>{label}</span>
                    </button>
                ))}

                <button onClick={() => themeToggle()} className={styles.navBtn} aria-label="Toggle tema">
                    {Isdarks ? <Moon size={20} /> : <Sun size={20} />}
                    <span className={styles.navLabel}>Tema</span>
                </button>
            </nav>
        </div>
    );
}
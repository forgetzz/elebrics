"use client"
import { Home, Upload, BarChart2, User, Moon, Sun, UploadIcon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import styles from "./Home.module.css"
import { TabKey, tabStrategies } from "@/constant/Tabkey";
import { useTabStore } from "@/store/useTabStore";
import { Colors } from "@/utils";

const nav_items: { key: TabKey; icon: React.ReactNode; label: string }[] = [
    { key: "home", icon: <Home size={22} />, label: "Beranda" },
    { key: "chart", icon: <BarChart2 size={22} />, label: "Statistik" },
    { key: "upload", icon: <UploadIcon size={22} />, label: "Upload" },
    { key: "profile", icon: <User size={22} />, label: "Profil" },
];

export default function DashboardLayout() {
    const { activeTab, setActiveTab } = useTabStore();
    const { IsDark, themeToggle } = useTheme();
    const theme = IsDark ? Colors.PrimaryBg : Colors.SecondryBg

    return (
        <div className={`${styles.root} ${theme} `}>
            <main className={styles.main}>{tabStrategies[activeTab]}</main>

            <nav className={styles.bottomNav}>
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
                    {IsDark ? <Moon size={20} /> : <Sun size={20} />}
                    <span className={styles.navLabel}>Tema</span>
                </button>
            </nav>
        </div>
    );
}
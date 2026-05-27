import React from 'react'
import styles from '../css/Aboutus.module.css'

import {
    Music4,
    Users,
    Flame,
} from "lucide-react";
import { Button } from '../ui/Button';

const values = [
    {
        icon: Music4,
        title: "Musik Tanpa Batas",
        desc:
            "Kami percaya setiap suara berhak didengar. Platform kami membuka ruang bagi semua genre dan semua artis.",
    },
    {
        icon: Users,
        title: "Komunitas Solid",
        desc:
            "Membangun ekosistem musik lokal yang saling mendukung antara artis, produser, dan pendengar setia.",
    },
    {
        icon: Flame,
        title: "Selalu Terdepan",
        desc:
            "Kami terus berinovasi menghadirkan rilis terbaru, fitur terkini, dan pengalaman mendengarkan terbaik.",
    },
];


const Trigger = () => {
    console.log("adsa")
}

export default function AboutUs() {
    return (
        <section id='About' className={styles.section}>
            <div className={styles.container}>


                <div className={styles.split}>


                    <div className={styles.textBlock}>
                        <span className={styles.label}>Tentang Kami</span>
                        <h2 className={styles.title}>
                            PT. ELBRIC  <br />
                            <em className={styles.titleAccent}>MUSIC</em>
                        </h2>
                        <p className={styles.body}>
                            PT. ELBRIC MUSIC berdiri sejak tahun 2024, namun perjalanan dan perjuangan kami telah dimulai sejak tahun 2010. Dengan proses yang tidak mudah, kami terus berkembang mengikuti era digital untuk menciptakan ruang yang lebih baik bagi musisi lokal dan label independen.
                        </p>
                        <p className={styles.body}>
                            Kami hadir untuk mendukung karya-karya original agar dapat berkembang lebih luas dan dikenal di industri musik digital. Transparansi menjadi salah satu prinsip utama kami kepada setiap member, karena kami percaya hubungan yang baik dibangun melalui kepercayaan dan komunikasi yang dekat.

                        </p>
                        <p className={styles.body}>
                            ELBRIC MUSIC juga membuka kesempatan bagi para artis, kreator, dan label independen untuk bertumbuh bersama, membangun relasi, dan saling mengenal lebih dekat dalam satu perjalanan menuju perkembangan musik yang lebih luas dan profesional.
                        </p>
                        <Button func={() => Trigger()} textBtn='Pelajari Lebih lanjut' />
                    </div>

                    <div className={styles.imageBlock}>
                        <div className={styles.imageWrapper}>
                            <img
                                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80"
                                alt="Studio musik"
                                className={styles.image}
                            />
                            <div className={styles.imageOverlay} />
                        </div>
                        {/* Floating badge */}
                        <div className={styles.badge}>
                            <span className={styles.badgeYear}>Est.</span>
                            <span className={styles.badgeNum}>2010</span>
                        </div>
                    </div>
                </div>




                <div className={styles.valuesGrid}>
                    {values.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={32} />
                                </div>


                                <h3 className={styles.valueTitle}>{item.title}</h3>
                                <p className={styles.valueDesc}>{item.desc}</p>


                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    )
}
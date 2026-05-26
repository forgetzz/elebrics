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
        <section className={styles.section}>
            <div className={styles.container}>


                <div className={styles.split}>


                    <div className={styles.textBlock}>
                        <span className={styles.label}>Tentang Kami</span>
                        <h2 className={styles.title}>
                            Rumah Musik <br />
                            <em className={styles.titleAccent}>Indonesia</em>
                        </h2>
                        <p className={styles.body}>
                            Kami adalah platform musik digital yang lahir dari kecintaan mendalam
                            terhadap industri musik lokal. Sejak berdiri, kami telah menjadi
                            jembatan antara artis berbakat dan jutaan pendengar di seluruh nusantara.
                        </p>
                        <p className={styles.body}>
                            Dari single perdana hingga album penuh, setiap rilis mendapat panggung
                            yang layak di sini — karena kami percaya bahwa musik Indonesia layak
                            untuk bersinar di panggung dunia.
                        </p>
                       <Button func={() => Trigger()} textBtn='Pelajari Lebih lanjut'/>
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
                            <span className={styles.badgeNum}>2017</span>
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

                             <span className={styles.valueIcon}><Icon size={25}/></span>
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
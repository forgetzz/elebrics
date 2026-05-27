import React from 'react'
import styles from '../css/RilisSection.module.css'

const listRilis = [
  {
    title: "Langit Malam",
    artist: "Budi",
    type: "Single",
    date: "24 Mei 2025",
    cover: "https://picsum.photos/seed/rilis1/300/300",
    url: "/rilis/langit-malam",
  },
  {
    title: "Satu Rasa",
    artist: "Pria Solo",
    type: "Album",
    date: "10 Apr 2025",
    cover: "https://picsum.photos/seed/rilis2/300/300",
    url: "/rilis/satu-rasa",
  },
  {
    title: "Bara di Dada",
    artist: "Rina Melodi",
    type: "Single",
    date: "02 Mar 2025",
    cover: "https://picsum.photos/seed/rilis3/300/300",
    url: "/rilis/bara-di-dada",
  },
  {
    title: "Malam Terakhir",
    artist: "Dimas Rock",
    type: "EP",
    date: "18 Jan 2025",
    cover: "https://picsum.photos/seed/rilis4/300/300",
    url: "/rilis/malam-terakhir",
  },
]

export default function RilisSection() {
  return (
    <section id='Rilis' className={styles.section}>
      {/* Background noise texture */}
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Terbaru</span>
          <h2 className={styles.title}>Rilis Musik</h2>
          <p className={styles.subtitle}>
            Temukan lagu, single, dan album terbaru yang baru saja dirilis.
          </p>
        </div>

        {/* Rilis List */}
        <div className={styles.list}>
          {listRilis.map((item, index) => (
            <a
              key={index}
              href={item.url || '#'}
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number */}
              <span className={styles.number}>
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Cover */}
              <div className={styles.coverWrapper}>
                <img
                  src={item.cover}
                  alt={item.title}
                  className={styles.cover}
                />
                <div className={styles.playIcon}>▶</div>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.type}>{item.type}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <h3 className={styles.songTitle}>{item.title}</h3>
                <p className={styles.artist}>{item.artist}</p>
              </div>

              {/* Arrow */}
              <span className={styles.arrow}>→</span>

              {/* Hover accent line */}
              <div className={styles.accentLine} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <a href="/rilis" className={styles.ctaButton}>
            Lihat Semua Rilis
          </a>
        </div>

      </div>
    </section>
  )
}
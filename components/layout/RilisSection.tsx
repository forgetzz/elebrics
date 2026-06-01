import React from 'react'
import styles from '../css/RilisSection.module.css'

const listRilis = [
  {
    title: "Track 1",
    type: "track",
    spotifyId: "2Ha3gkoboSVFDw3Thncl2x",
  },
  {
    title: "Track 2",
    type: "track",
    spotifyId: "0jLIgrAY4Wi3NW9kKVxvfc",
  },
  {
    title: "Album",
    type: "album",
    spotifyId: "5KbT2psnlpep1vPxdK1zrF",
  },
  {
    title: "Track 3",
    type: "track",
    spotifyId: "5XDatrG4gely9zT4od825W",
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
            <div key={index} className={styles.spotifyCard}>
              <iframe
                src={`https://open.spotify.com/embed/${item.type}/${item.spotifyId}`}
                width="100%"
                height={item.type === "album" ? "352" : "152"}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <a href="/" className={styles.ctaButton}>
            Lihat Semua Rilis
          </a>
        </div>

      </div>
    </section>
  )
}
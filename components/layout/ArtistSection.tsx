import React from 'react'
import styles from '../css/ArtistSection.module.css'
import ButtonTwo from '../ui/ButtonTwo'

const listArtist = [
  {
    title: "Budi",
    url: "/artist/budi",
    genre: "Pop",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    title: "Aris",
    url: "/artist/pria-solo",
    genre: "R&B",
    image: "https://i.pravatar.cc/300?img=3",
  },
  {
    title: "Rina Melodi",
    url: "/artist/rina-melodi",
    genre: "Jazz",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    title: "Dimas Rock",
    url: "/artist/dimas-rock",
    genre: "Rock",
    image: "https://i.pravatar.cc/300?img=8",
  },
]

const trigger = () => {
  alert("asas")
}
export default function ArtistSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Temukan</span>
          <h2 className={styles.title}>Artist Pilihan</h2>
          <p className={styles.subtitle}>
            Jelajahi koleksi artis berbakat dari berbagai genre musik terbaik.
          </p>
        </div>

        {/* Artist Grid */}
      <div className={styles.grid}>
  {listArtist.map((artist, index) => (
    <a
      key={index}
      href={artist.url}
      className={styles.stack}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={artist.image}
            alt={artist.title}
            className={styles.image}
          />

          <div className={styles.overlay}>
            <span className={styles.visitText}>
              Lihat Profil →
            </span>
          </div>
        </div>

        <div className={styles.info}>
          <span className={styles.genre}>
            {artist.genre}
          </span>

          <h3 className={styles.artistName}>
            {artist.title}
          </h3>
        </div>
      </div>
    </a>
  ))}
</div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <a href="/artists" className={styles.ctaButton}>
       <ButtonTwo func={() => trigger()} textBtn='Lihat Artist' textColor='text-black'/>

          </a>
        </div>

      </div>
    </section>
  )
}
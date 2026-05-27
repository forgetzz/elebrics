import React from 'react'
import styles from '../css/ArtistSection.module.css'
import ButtonTwo from '../ui/ButtonTwo'

const listArtist = [
  {
    title: "Ichad Bless (Local Pride from palua)",
    url: "/artist/ic.jpeg",
    genre: "Reggae Riddim",
    image: "/artist/ic.jpeg",
  },
  {
    title: "Its Bhi (Local Prider From Papua)",
    url: "/artist/as.jpeg",
    genre: "HIP-HIP",
    image: "/artist/as.jpeg",
  },
  {
    title: "ONCHO FLASH (NATIONAL ARTIS)",
    url: "/artist/v.jpeg",
    genre: "Hip-Hop",
    image: "/artist/v.jpeg",
  },
  {
    title: "DJ Dimas Gazebo",
    url: "/artist/c.jpeg",
    genre: "Remixer",
    image: "/artist/c.jpeg",
  },
]

const trigger = () => {
  alert("asas")
}
export default function ArtistSection() {
  return (
    <section id='Artist' className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Temukan</span>
          <h2 className={styles.title}>Artist Utama</h2>
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
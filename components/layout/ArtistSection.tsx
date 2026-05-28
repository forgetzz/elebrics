'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../css/ArtistSection.module.css'
import ButtonTwo from '../ui/ButtonTwo'

const listArtist = [
  {
    title: "Ichad Bless (Local Pride from Papua)",
    slug: "/ic.jpeg",
    genre: "Reggae Riddim",
    image: "/artist/ic.jpeg",
  },
  {
    title: "Its Bhi (Local Pride From Papua)",
    slug: "/as.jpeg",
    genre: "Hip-Hop",
    image: "/artist/as.jpeg",
  },
  {
    title: "ONCHO FLASH (National Artist)",
    slug: "/v.jpeg",
    genre: "Hip-Hop",
    image: "/artist/v.jpeg",
  },
  {
    title: "DJ Dimas Gazebo",
    slug: "/c.jpeg",
    genre: "Remixer",
    image: "/artist/c.jpeg",
  },
]

export default function ArtistSection() {
  const handleArtist = () => {
    alert('Fitur artist akan segera hadir')
  }

  return (
    <section id="Artist" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>
            Temukan
          </span>

          <h2 className={styles.title}>
            Artist Utama
          </h2>

          <p className={styles.subtitle}>
            Jelajahi koleksi artis berbakat dari berbagai genre musik terbaik.
          </p>
        </div>

        {/* Artist Grid */}
        <div className={styles.grid}>
          {listArtist.map((artist, index) => (
            <Link
              key={artist.slug}
              href={`/artist/${artist.slug}`}
              className={styles.stack}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={artist.image}
                    alt={artist.title}
                    fill
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
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrapper}>
          <ButtonTwo
            func={handleArtist}
            textBtn="Lihat Artist"
            textColor="text-black"
          />
        </div>

      </div>
    </section>
  )
}
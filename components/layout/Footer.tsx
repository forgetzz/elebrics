import React from 'react'
import styles from '../css/Footer.module.css'

const navLinks = {
  Musik: [
    { label: 'Rilis Terbaru', href: '/rilis' },
    { label: 'Artist', href: '/artist' },
    { label: 'Album', href: '/album' },
    { label: 'Playlist', href: '/playlist' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Karir', href: '/karir' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press Kit', href: '/press' },
  ],
  Dukungan: [
    { label: 'Pusat Bantuan', href: '/help' },
    { label: 'Hubungi Kami', href: '/contact' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Syarat & Ketentuan', href: '/terms' },
  ],
}

const socials = [
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'TT', href: 'https://tiktok.com' },
  { label: 'YT', href: 'https://youtube.com' },
  { label: 'SP', href: 'https://spotify.com' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Noise texture */}
      <div className={styles.noise} aria-hidden="true" />

      {/* Top red stripe */}
      <div className={styles.topStripe} />

      <div className={styles.container}>

        {/* ── Main Grid ── */}
        <div className={styles.grid}>

          {/* Brand Column */}
      <div className={styles.brandCol}>
  <a href="/" className={styles.logo}>
    <span className={styles.logoAccent}></span>
    ELEBRIC MUSIC
  </a>

  <p className={styles.tagline}>
    Rumah musik Indonesia. Dari artis lokal,
    untuk pendengar dunia.
  </p>

  {/* Company Info */}
  <div className={styles.companyInfo}>
    <p>
      <strong>CEO:</strong> Lusia M
    </p>

    <p>
      <strong>Alamat:</strong>
      Jl. Musik Nusantara No. 88,
      Makassar, Sulawesi Selatan,
      Indonesia
    </p>

    <p>
      <strong>Email:</strong>
      info@elebricmusic.com
    </p>
  </div>

  {/* Social icons */}
  <div className={styles.socials}>
    {socials.map((s) => (
      <a
        key={s.label}
        href={s.href}
        className={styles.socialBtn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.label}
      >
        {s.label}
      </a>
    ))}
  </div>
</div>
          {/* Nav Columns */}
          {Object.entries(navLinks).map(([group, links]) => (
            <div key={group} className={styles.navCol}>
              <h4 className={styles.navGroup}>{group}</h4>
              <ul className={styles.navList}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.navLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} />

        {/* ── Bottom Bar ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} MusikaID. Hak cipta dilindungi.
          </p>
          <p className={styles.madeWith}>
            Dibuat dengan <span className={styles.heart}>♥</span> di Indonesia
          </p>
        </div>

      </div>
    </footer>
  )
}
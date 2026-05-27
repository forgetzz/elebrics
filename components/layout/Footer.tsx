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
    { label: 'Pusat Bantuan', href: '/' },
    { label: 'Hubungi Kami', href: 'https://www.instagram.com/elbricmediagroup?igsh=and3c3ZkdjhlM3p2' },
    { label: 'Kebijakan Privasi', href: '/' },
    { label: 'Syarat & Ketentuan', href: '/' },
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
    <footer id='Footer' className={styles.footer}>
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
    Rumah musik. Dari artis lokal,
    untuk pendengar dunia.
  </p>

  {/* Company Info */}
  <div className={styles.companyInfo}>
    <p>
      <strong>CEO:</strong> Lusia M
    </p>

    <p>
      <strong>Alamat:</strong>
      Netherland
    </p>
    <p>
      <strong>Perwakilan PT ELBRIC MUSIC : </strong>
    Richard 
    </p>

    <p>
      <strong>Email:</strong>
    simbiakrichardboas@gmail.com
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
            © {new Date().getFullYear()} ELBRIC MUSIC. Hak cipta dilindungi.
          </p>
          <p className={styles.madeWith}>
            Dibuat dengan <span className={styles.heart}>♥</span> di Indonesia
          </p>
        </div>

      </div>
    </footer>
  )
}
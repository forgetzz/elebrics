"use client"
import React, { useState } from 'react'
import styles from "../css/Navbar.module.css"
import { Button } from '../ui/Button'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const test = () => {
    console.log("as")
  }
  return (
    <>
      <header className={styles.navbarRoot}>
        <div className={styles.navbarWrapper}>
          <div className={styles.navbarInner}>
            {/* Brand */}
            <a className={styles.brand} href="#">
              <div className={styles.brandIcon}>
              <img src="/logo/logo.png" alt="" />
              </div>

              <div className={styles.brandText}>
                <span className={styles.brandTitle}>
                  EL<span></span>BRIC MUSIC DISTRIBUTION
                </span>

             
              </div>
            </a>

            {/* Desktop Links */}
            <ul className={styles.navLinks}>
              <li>
                <a href="#">Home</a>
              </li>

              <li>
                <a href="#Rilis">Rilis Music</a>
              </li>

              <li>
                <a href="#Artist">Artists</a>
              </li>
              <li>
                <a href="#About">About Us</a>
              </li>

              <li>
                <a href="#Footer">Contact us</a>
              </li>

             
            </ul>
            
            <button
              className={`${styles.menuBtn} ${menuOpen ? styles.active : ""
                }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* Hamburger */}

          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""
            }`}
        >
          <a href="#">Beats</a>
          <a href="#">Services</a>
          <a href="#">Artists</a>
          <a href="#">Studio</a>

          <Button textBtn='Login' func={() => test()}/>
        </div>
      </header>
    </>
  )
}
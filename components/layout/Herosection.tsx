"use client"
import React from 'react'
import styles from '../css/Herosection.module.css'
import { Button } from '../ui/Button'
import ButtonTwo from '../ui/ButtonTwo'
import { useRouter } from 'next/navigation'


export default function Herosection() {
  const router = useRouter()

  const test = () => {
  router.push('../../Login')
  }
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>

        {/* ── Left: Text Content ── */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>Premium Music Production</span>

          <h1 className={styles.heading}>
           ELBRIC {' '}
            <span className={styles.accent}> MUSIC,</span>
            <br />
        {' '}
            <span className={styles.outline}>   DISTRIBUTION</span>
          </h1>

          <p className={styles.description}>
          Independent Label yang mendukung promosi karya artis dan label independen menuju platform musik global. Mengutamakan kualitas, karya original, dan original sound tanpa AI.
          </p>

          <div className={styles.actions}>
         <Button textBtn='Login' func={() => test()}/>
          <ButtonTwo textBtn="Singup" func={() => test()} textColor='text-white'/>
          </div>

     
        </div>

        {/* ── Right: Vinyl Visual ── */}
        <div className={styles.visual}>
          <div className={styles.discRing} />
          <div className={styles.discRing} />
          <div className={styles.discRing} />
          <div className={styles.disc} />
        </div>
 

      </div>
    </section>
  )
}
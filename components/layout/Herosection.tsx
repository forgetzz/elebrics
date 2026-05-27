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
            CRAFT YOUR{' '}
            <span className={styles.accent}>SOUND,</span>
            <br />
            DEFINE YOUR{' '}
            <span className={styles.outline}>LEGACY</span>
          </h1>

          <p className={styles.description}>
            Beats crafted for artists who refuse to blend in.
            From trap to orchestral, we produce sounds that move
            crowds and build careers — one track at a time.
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
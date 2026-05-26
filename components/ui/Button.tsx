"use client"
import { ButtonTypes} from '@/types/index'
import Styles from "../css/Button.module.css"
import React from 'react'

export function Button({ func, textBtn }: ButtonTypes) {
    return (

            <button onClick={func} className={`${Styles.button}`}>
                <div className={Styles.blob1}></div>
                <div className={Styles.blob2}></div>
                <div className={Styles.inner}>{textBtn}</div>
            </button>
       
    )
}

import { ButtonTypes, ButtonTypes2 } from '@/types'
import React from 'react'

export default function ButtonTwo({textBtn, func, textColor} : ButtonTypes2) {
  return (

<div onClick={func} className="relative group cursor-pointer">
  <div
    className={`${textColor} relative px-4 py-2 border-2 border-red-500  font-bold text-sm rounded-lg transform transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-1 shadow-[6px_6px_10px_rgba(0,0,0,0.6),-6px_-6px_10px_rgba(255,255,255,0.1)] group-hover:shadow-[8px_8px_15px_rgba(0,0,0,0.8),-8px_-8px_15px_rgba(255,255,255,0.15)]`}
  >
   {textBtn}
  </div>

  <div
    className="absolute inset-0 border-2 border-dashed border-red-500 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"
  ></div>

  <div
    className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping shadow-lg"
  ></div>
  <div
    className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping shadow-lg"
  ></div>
  <div
    className="absolute top-1/3 left-3 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-70"
  ></div>
  <div
    className="absolute top-2/3 right-3 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-70"
  ></div>
</div>

  )
}

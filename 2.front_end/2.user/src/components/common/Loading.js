import Image from 'next/image'
import React from 'react'
import Animation from './Animation'

export default function Loading() {
  return (
    <div className='fixed pb-20 w-full h-full flex items-center justify-center bg-white z-10 mb-10'>
          <Animation>
              <Image width={400} height={100} src={require("../../assets/images/logo_tnf.png")} />
          </Animation>
    </div>
  )
}

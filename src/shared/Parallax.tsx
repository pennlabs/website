import React, { useState, useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ReactChildren } from '../types'

interface IParallaxWrapperProps {
  children: ReactChildren
}

export const ParallaxWrapper = ({ children }: IParallaxWrapperProps) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const { innerWidth } = window
    if (innerWidth > 584) {
      setDisabled(false)
    } else {
      console.log('disabled')
      setDisabled(true)
    }
  })

  //   if (disabled) {
  //     return children
  //   }

  return (
    <Parallax y={[-32, 32]} disabled={disabled}>
      {children}
    </Parallax>
  )
}

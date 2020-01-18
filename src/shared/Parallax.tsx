import React, { useState, useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ReactChildren } from '../types'

interface IParallaxWrapperProps {
  y?: number[]
  children: ReactChildren
}

/**
 * Wrap the Prallax component from `react-scroll-parallax` to disable the
 * behavior when the user loads the page on a mobile devices
 *
 * NOTE if the user shrinks the device dimensions without refreshing the page,
 * we might see some odd behavior. At the moment, we don't worry about this use
 * case.
 */
export const ParallaxWrapper = ({
  children,
  ...rest
}: IParallaxWrapperProps) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const { innerWidth } = window
    if (innerWidth > 584) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  })

  return (
    <Parallax y={[-32, 32]} disabled={disabled} {...rest}>
      {children}
    </Parallax>
  )
}

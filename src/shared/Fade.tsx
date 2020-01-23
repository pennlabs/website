import React from 'react'
import styled, { css } from 'styled-components'
import { ReactChildren } from '../types'

const FadeNode = styled.div<{ delay?: number; show: boolean }>(
  ({ show, delay }) => css`
    opacity: 0;
    transform: translate(0, 10%);
    transition: opacity ${delay || 400}ms ease-out,
      transform ${delay || 400}ms ease-out;
    will-change: opacity, visibility;

    ${show &&
      `
    opacity: 1;
    transform: translate(0, 0);
    display: flex;
  `}
  `,
)

interface IFadeProps {
  delay?: number
  children: ReactChildren
}

export const Fade = ({ delay, children }: IFadeProps) => {
  const domRef = React.useRef()

  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setShow(true)

        // No need to keep observing:
        observer.unobserve(domRef.current)
      }
    })

    observer.observe(domRef.current)

    return () => observer.unobserve(domRef.current)
  }, [])

  return (
    <FadeNode ref={domRef} show={show} delay={delay}>
      {children}
    </FadeNode>
  )
}

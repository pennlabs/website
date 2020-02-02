import React from 'react'
import styled, { css } from 'styled-components'
import { ReactChildren } from '../types'

interface IFadeNodeProps {
  delay?: number
  show: boolean
  distance?: string
}

interface IFadeProps {
  delay?: number
  distance?: string
  children: ReactChildren
}

const FadeNode = styled.div<IFadeNodeProps>(
  ({ show, delay, distance }) => css`
    opacity: 0;
    transform: translate(0, ${distance || '10%'});
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

/**
 * Wrapper component to fade content in when it enters the scrollview
 *
 * NOTE can have odd impacts on display, especially when there are several
 * children. Sometimes help to put a single `<div />` inside the fade
 *
 * @property {number} delay           - how long the animation takes
 * @property {string} distance        - distance component slides up
 * @property {ReactChildren} children - content to fade in
 */
export const Fade = ({ delay, distance, children }: IFadeProps) => {
  const domRef = React.useRef()
  const [show, setShow] = React.useState<boolean>(false)

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
    <FadeNode ref={domRef} show={show} delay={delay} distance={distance}>
      {children}
    </FadeNode>
  )
}

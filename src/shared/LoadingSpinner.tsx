import React, { useState, useEffect } from 'react'
import s, {
  keyframes,
  css,
  FlattenSimpleInterpolation,
} from 'styled-components'

import { Text } from './Typography'
import { BORDER, BLUE, WHITE, WHITE_ALPHA } from '../../constants/colors'
import { SHORT_ANIMATION_DURATION } from '../../constants/measurements'
import { noop } from '../../util/helpers'

const SIZE = '2.5rem'
const THICKNESS = '0.25rem'
const TIMER = '1.25s'

interface ILoadingWrapperProps {
  hide: boolean
}

const LoadingWrapper = s.div<ILoadingWrapperProps>`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: ${({ hide }) => (hide ? '0' : '1')};
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

interface ILoadingSpinnerProps {
  title?: string
  delay?: number
  size?: string
  white?: boolean
  thickness?: string
  style?: React.CSSProperties
}

const LoadingCircle = s.span<Partial<ILoadingSpinnerProps>>(
  ({ size, white, thickness }): FlattenSimpleInterpolation => css`
    display: inline-block;
    width: ${size};
    height: ${size};
    border-radius: 50%;
    border-width: ${thickness};
    border-style: solid;
    border-right-color: ${white ? WHITE_ALPHA(0.375) : BORDER};
    border-left-color: ${white ? WHITE : BLUE};
    border-bottom-color: ${white ? WHITE : BLUE};
    border-top-color: ${white ? WHITE : BLUE};
    animation: ${spin} ${TIMER} infinite linear;
  `,
)

export const LoadingSpinner = ({
  title,
  size = SIZE,
  delay = SHORT_ANIMATION_DURATION,
  white,
  style,
  thickness = THICKNESS,
}: ILoadingSpinnerProps): React.ReactElement => {
  const [hidden, toggleHidden] = useState(true)

  useEffect(() => {
    if (hidden) {
      const timer = setTimeout(() => {
        toggleHidden(false)
      }, delay)
      return () => clearTimeout(timer)
    }
    return noop
  })

  return (
    <LoadingWrapper hide={hidden} style={style}>
      <LoadingCircle size={size} white={white} thickness={thickness} />
      {title && <Text sm>{title}</Text>}
    </LoadingWrapper>
  )
}

import React from 'react'
import s, { css } from 'styled-components'

import { fadeIn, fadeOut } from './animations'
import { LONG_ANIMATION_DURATION } from '../constants/measurements'
import { BLACK_ALPHA } from '../constants/colors'
import { useState, useEffect } from 'react'

type IShadeProps = Partial<React.HTMLProps<HTMLDivElement>> & {
  show: boolean
  zIndex: number
}

type IStyledShadeProps = IShadeProps & { isNewlyMounted: boolean }

const StyledShade = s.div<IStyledShadeProps>(
  ({ zIndex, show, isNewlyMounted }) => css`
    position: fixed;
    width: 100vw;
    height: 100vh;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    overflow-x: hidden;
    overflow-y: hidden;
    background: ${BLACK_ALPHA(0.5)};
    z-index: ${zIndex};
    text-align: center;

    animation-name: ${isNewlyMounted ? '' : show ? fadeIn : fadeOut};

    animation-duration: ${LONG_ANIMATION_DURATION}ms;
    max-height: ${show ? '100vh' : '0vh'};
    opacity: ${show ? '1' : '0'};
  `,
)

export const Shade = ({ show, ...rest }: IShadeProps): React.ReactElement => {
  const [isNewlyMounted, setIsNewlyMounted] = useState<boolean>(true)

  useEffect(() => {
    if (!isNewlyMounted) return
    if (show) setIsNewlyMounted(false)
  }, [show])

  return <StyledShade show={show} isNewlyMounted={isNewlyMounted} {...rest} />
}

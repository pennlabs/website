import React, { useState } from 'react'
import styled from 'styled-components'

import { Shade, Container } from '../../shared'
import { Links } from './Links'
import { Bars } from './Bars'
import { Logo } from './Logo'

import {
  maxWidth,
  PHONE,
  HEADER_HEIGHT,
  HEADER_Z_INDEX,
  MOBILE_HEADER_HEIGHT,
} from '../../constants/measurements'
import { WHITE_ALPHA, WHITE, BLACK_ALPHA } from '../../constants/colors'

const StyledNav = styled.nav<{ active: boolean }>`
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: fixed;
  top: 0;
  z-index: ${HEADER_Z_INDEX};
  width: 100%;
  min-height: ${HEADER_HEIGHT};
  background: ${WHITE_ALPHA(0.9)};

  ${maxWidth(PHONE)} {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background: ${WHITE};
    min-height: 0;
    max-height: ${props => {
      // Kinda kills the close transition, but it's a hack to get the height right
      return props.active ? '100vh' : MOBILE_HEADER_HEIGHT
    }};
    overflow: hidden;
    box-shadow: 0 1px 8px ${BLACK_ALPHA(0.2)};
  }
`

const StyledContainer = styled(Container)<{}>`
  display: flex;
  flex-direction: row;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

const NavSpace = styled.div<{}>`
  height: ${HEADER_HEIGHT};
  width: 100%;
  display: block;

  ${maxWidth(PHONE)} {
    height: ${MOBILE_HEADER_HEIGHT};
  }
`

export const Nav = (): React.ReactElement => {
  const [active, setActive] = useState<boolean>(false)
  return (
    <>
      <StyledNav active={active}>
        <StyledContainer>
          <Logo />
          <Bars handleClick={() => setActive(!active)} />
          <Links active={active} />
        </StyledContainer>
      </StyledNav>
      <NavSpace />
      <Shade
        tabIndex={-1}
        zIndex={HEADER_Z_INDEX - 1}
        show={active}
        onClick={() => setActive(!active)}
      />
    </>
  )
}

export default Nav

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
} from '../../constants/measurements'
import { WHITE } from '../../constants/colors'

const StyledNav = styled.nav`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: fixed;
  top: 0;
  z-index: ${HEADER_Z_INDEX};
  width: 100%;
  min-height: ${HEADER_HEIGHT};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  background: ${WHITE};
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

const NavSpace = styled.div`
  height: ${HEADER_HEIGHT};
  width: 100%;
  display: block;
`

export const Nav = (): React.ReactElement => {
  const [active, setActive] = useState<boolean>(false)
  return (
    <>
      <StyledNav>
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

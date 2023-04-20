import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import {
    maxWidth,
    minWidth,
    PHONE,
    DESKTOP,
    SHORT_ANIMATION_DURATION,
} from '../../constants/measurements'
import { BLACK } from '../../constants/colors'
import { WORK_SANS } from '../../constants/fonts'
import { StyledLink } from './Links'

export const StyledButton = styled.button`
  height: 2rem;
  line-height: 2rem;
  margin-left: 1rem;
  color: ${BLACK};
  opacity: 0.64;
  text-decoration: none;
  cursor: pointer;
  font-family: ${WORK_SANS};
    background-color: transparent;
    border: none;
    display: inline;

  ${minWidth(DESKTOP)} {
    margin-left: calc(1rem + 1.25vw);
  }

  ${maxWidth(PHONE)} {
    width: 100%;
    text-align: center;
    display: block;
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
`

const DropdownMenu = styled.div`
   position:absolute;
   z-index:3;
   left: calc(1rem + 1.25vw);
    opacity: 0;
    background-color: white;

   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.20);
   border-radius: 15px;


   width: 200%;
   & button:first-child {
    border-bottom:solid #e6e6e6 .5px
  }
`

const DesktopWrapper = styled.div`
    display: inline;
    position: relative;
    left: 0 !important;
    &:hover > div {
        opacity: 0.5;
    }
    & > div {
        height: 70px;
    }
    ${maxWidth(PHONE)} {
        display: none;
    }
`

const MobileWrapper = styled.div`
    display: none;
    ${maxWidth(PHONE)} {
        display: inline;
    }
`

const DropdownButton = styled.button`
    width: 100%;
    border: none;
    background-color: transparent;
    :hover {
        background-color:#f2f2f2
      }
    height: 50%;
    color: ${BLACK};
`

const DropdownLinks = styled(Link) <{}>`
color: ${BLACK};
width: 100%;
`

const DropdownButtonWithMenu = ({ label, links }) => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <DesktopWrapper onMouseLeave={() => setShowMenu(false)}>
                <StyledButton onMouseEnter={() => setShowMenu(true)}>{label}</StyledButton>
                {showMenu && (
                    <DropdownMenu>
                        {links.map(text => (
                            <DropdownButton key={text[0]}>
                                <DropdownLinks to={text[1]}>{text[0]}</DropdownLinks>
                            </DropdownButton>
                        ))}
                    </DropdownMenu>
                )}
            </DesktopWrapper>
            <MobileWrapper>
            {links.map(([text, link]) =>
                <StyledLink to={link} key={link}>
                    {text}
                </StyledLink>
            )}
            </MobileWrapper>
        </>
    )
}

export default DropdownButtonWithMenu
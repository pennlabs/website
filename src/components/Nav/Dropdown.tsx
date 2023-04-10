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
import {
    ABOUT_ROUTE,
    TEAM_ROUTE,
    ALUMNI_ROUTE,
    PRODUCTS_ROUTE,
    RESOURCES_ROUTE,
    BLOG_ROUTE,
    APPLY_ROUTE,
} from '../../constants/routes'
import { StyledLink } from './Links'
import { relative } from 'path'

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
`;

interface IDropdownProps {
    active: boolean
}

const DropdownWrapper = styled.div<IDropdownProps>`
    flex: 1;
    text-align: right;
    display: static;
  
    ${maxWidth(PHONE)} {
      flex: none;
      text-align: left;
      display: block;
      overflow: hidden;
      transition: max-height ${SHORT_ANIMATION_DURATION}ms ease,
        opacity ${SHORT_ANIMATION_DURATION}ms ease;
      max-height: ${({ active }) => (active ? '100vh' : '0')};
      opacity: ${({ active }) => (active ? '1' : '0')};
    }
  `

const Wrapper = styled.div`
    display: inline;
    position: relative;
    left: 0 !important;
    &:hover > div {
        opacity: 0.5;
    }
    & > div {
        height: 70px;
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
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <Wrapper onMouseLeave={() => setShowMenu(false)}>
                <StyledButton onMouseEnter={() => setShowMenu(true)}>{label}</StyledButton>
                {showMenu && (
                    <DropdownMenu>
                        {links.map((text) => (
                            <DropdownButton onClick={()=> console.log(links)} key={text[0]}>
                                <DropdownLinks to={text[1]}>{text[0]}</DropdownLinks>
                            </DropdownButton>
                            
                        ))}
                    </DropdownMenu>
                )}
            </Wrapper>
        </>
    );
};

export default DropdownButtonWithMenu
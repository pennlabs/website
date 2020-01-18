import React from 'react'
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

interface ILinksProps {
  active: boolean
}

const LinksWrapper = styled.div<ILinksProps>`
  flex: 1;
  text-align: right;

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

const Spacer = styled.div<{}>`
  display: none;

  ${maxWidth(PHONE)} {
    display: block;
    width: 100%;
    height: 0.5rem;
  }
`

const StyledLink = styled(Link)<{}>`
  height: 2rem;
  line-height: 2rem;
  margin-left: 1rem;
  color: ${BLACK};
  opacity: 0.64;
  text-decoration: none;
  cursor: pointer;
  transition: opacity ${SHORT_ANIMATION_DURATION}ms ease;
  font-family: ${WORK_SANS};

  &:visited {
    color: ${BLACK};
  }

  &:hover,
  &:active {
    color: ${BLACK};
    opacity: 1;
    text-decoration: none;
  }

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

const links: string[] = [
  'About',
  'Team',
  'Products',
  'Resources',
  'Blog',
  'Apply',
]

export const Links = ({ active }: ILinksProps): React.ReactElement => (
  <LinksWrapper active={active}>
    <Spacer />
    {links.map((link: string) => (
      <StyledLink to={`/${link.toLowerCase()}`} key={link}>
        {link}
      </StyledLink>
    ))}
  </LinksWrapper>
)

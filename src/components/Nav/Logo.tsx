import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'

const logoPath = require('../../images/labs-full-logo.svg') as string // tslint:disable-line

const Image = styled.img<{}>`
  height: 2rem;
  width: auto;
  margin-bottom: 0;
`

export const Logo = (): React.ReactElement => (
  <Link to={HOME_ROUTE} style={{ lineHeight: 0 }}>
    <Image src={logoPath} alt="Penn Labs" />
  </Link>
)

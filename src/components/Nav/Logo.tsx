import React from 'react'
import styled from 'styled-components'

const logoPath = require('../../images/labs-full-logo.svg') as string // tslint:disable-line

const Image = styled.img<{}>`
  height: 2rem;
  width: auto;
  margin-bottom: 0;
`

export const Logo = (): React.ReactElement => (
  <Image src={logoPath} alt="Penn Labs" />
)

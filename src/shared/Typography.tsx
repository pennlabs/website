import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_GRAY } from '../constants/colors'

interface ITextProps {
  color?: string
  opacity?: number
  sm?: boolean
  lg?: boolean
  mb0?: boolean
}

export const P = styled.p<ITextProps>(
  ({ color, opacity, mb0, sm, lg }) => css`
    color: ${color || DARK_GRAY};
    opacity: ${opacity || 1.0};
    ${mb0 && 'margin-bottom: 0;'}
    ${lg && 'font-size: 120%; line-height: 1.375;'}
    ${sm && 'font-size: 80%; line-height: 1.375;'}
  `,
)

export const H1 = ({ children, ...rest }) => (
  <P as="h1" {...rest}>
    {children}
  </P>
)
export const H2 = ({ children, ...rest }) => (
  <P as="h2" {...rest}>
    {children}
  </P>
)
export const H3 = ({ children, ...rest }) => (
  <P as="h3" {...rest}>
    {children}
  </P>
)
export const H4 = ({ children, ...rest }) => (
  <P as="h4" {...rest}>
    {children}
  </P>
)
export const H5 = ({ children, ...rest }) => (
  <P as="h5" {...rest}>
    {children}
  </P>
)
export const H6 = ({ children, ...rest }) => (
  <P as="h6" {...rest}>
    {children}
  </P>
)

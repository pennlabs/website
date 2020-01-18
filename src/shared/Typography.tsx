import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_GRAY } from '../constants/colors'

interface ITextProps {
  color?: string
  opacity?: number
  sm?: boolean
  lg?: boolean
  mb0?: boolean
  mb1?: boolean
  mb2?: boolean
  mb3?: boolean
  mb4?: boolean
}

export const P = styled.p<ITextProps>(
  ({ color, opacity, mb0, mb1, mb2, mb3, mb4, sm, lg }) => css`
    color: ${color || DARK_GRAY};
    opacity: ${opacity || 1.0};
    ${mb0 && 'margin-bottom: 0;'}
    ${mb1 && 'margin-bottom: 0.4rem;'}
    ${mb2 && 'margin-bottom: 0.8rem;'}
    ${mb3 && 'margin-bottom: 1.2rem;'}
    ${mb4 && 'margin-bottom: 1.6rem;'}
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

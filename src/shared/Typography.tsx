import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_GRAY, WHITE, BORDER } from '../constants/colors'
import { M0, M1, M2, M3, M4 } from '../constants/measurements'

interface ITextProps {
  white?: boolean
  color?: string
  opacity?: number
  sm?: boolean
  lg?: boolean
  mb0?: boolean
  mb1?: boolean
  mb2?: boolean
  mb3?: boolean
  mb4?: boolean
  normal?: boolean
  bold?: boolean
  left?: boolean
  center?: boolean
  right?: boolean
}

export const P = styled.p<ITextProps>(
  ({
    white,
    color,
    opacity,
    mb0,
    mb1,
    mb2,
    mb3,
    mb4,
    sm,
    lg,
    normal,
    bold,
    left,
    center,
    right,
  }) => css`
    color: ${white ? WHITE : color || DARK_GRAY};
    opacity: ${opacity || 1.0};
    ${mb0 && `margin-bottom: ${M0};`}
    ${mb1 && `margin-bottom: ${M1};`}
    ${mb2 && `margin-bottom: ${M2};`}
    ${mb3 && `margin-bottom: ${M3};`}
    ${mb4 && `margin-bottom: ${M4};`}
    ${lg && 'font-size: 120%; line-height: 1.375;'}
    ${sm && 'font-size: 80%; line-height: 1.375;'}
    ${normal && 'font-weight: 400;'}
    ${bold && 'font-weight: 700;'}
    text-align: ${left ? 'left' : right ? 'right' : center ? 'center' : 'left'};
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

export const HR = styled.hr`
  background: ${BORDER};
  margin-top: ${M4};
  margin-bottom: ${M4};
  display: block;
  width: 100%;
`

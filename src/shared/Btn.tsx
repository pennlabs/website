import React, { ReactNode } from 'react'
import s, { css } from 'styled-components'
import { Link } from 'gatsby'

import {
  LABS_BLUE,
  WHITE,
  LABS_BLUE_DEEP,
  RED,
  DARK_RED,
  OUTLINE,
  LABS_BLUE_ALPHA,
} from '../constants/colors'
import {
  maxWidth,
  PHONE,
  BORDER_RADIUS,
  SHORT_ANIMATION_DURATION,
} from '../constants/measurements'
import { INTER } from '../constants/fonts'

export enum EBtnKind {
  Primary,
  Danger,
}

export enum EBtnSize {
  LG,
  MD,
  SM,
}

export interface IBtnProps {
  fullWidth?: boolean
  disabled?: boolean
  bordered?: boolean
  size?: EBtnSize
  kind?: EBtnKind
  children?: ReactNode
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  marginBottom?: string
  style?: React.CSSProperties
}

const getKindStyles = (kind?: EBtnKind, disabled?: boolean): string => {
  if (kind === EBtnKind.Danger) {
    return `
      background: ${RED};
      color: ${WHITE} !important;
      border-color: ${DARK_RED};

      &:hover,
      &:active,
      &:focus {
        background: ${disabled ? RED : DARK_RED};
      }`
  }

  return `
    background: ${LABS_BLUE};
    color: ${WHITE} !important;
    border-color: ${LABS_BLUE_DEEP};
    box-shadow: 0 1px 6px ${LABS_BLUE_ALPHA(0.5)};

    &:hover,
    &:active,
    &:focus {
      background: ${disabled ? LABS_BLUE : LABS_BLUE_DEEP};
      box-shadow: 0 0 2px ${LABS_BLUE_ALPHA(0.75)};
    }`
}

const Btn = ({
  size,
  marginBottom,
  bordered,
  disabled,
  fullWidth,
  kind,
}: IBtnProps) => css`
  font-family: ${INTER};
  border: none;
  border-radius: ${BORDER_RADIUS};
  padding: ${
    size === EBtnSize.LG
      ? '0.75rem 1rem'
      : size === EBtnSize.SM
      ? '0.25rem 0.75rem'
      : '0.5rem 1rem'
  };
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  transition: all ${SHORT_ANIMATION_DURATION}ms ease;

  margin-bottom: ${marginBottom || '1rem'};
  border-width: ${bordered ? '2px' : '0'};
  border-style: solid;

  font-size: ${
    size === EBtnSize.LG ? '120%' : size === EBtnSize.SM ? '80%' : 'inherit'
  };

  &:visited {
    text-decoration: none;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${OUTLINE};
  }

  ${maxWidth(PHONE)} {
    padding: 0.5rem 0.75rem;
  }

  ${disabled && `opacity: 0.5; cursor: not-allowed; user-select: none;`}
  ${fullWidth && `width: 100%; text-align: center;`}

  ${getKindStyles(kind, disabled)}
`

export const BtnBtn = s.button<IBtnProps>(Btn)

export const BtnAnchor = s.a<IBtnProps>(Btn)

interface ILinkProps {
  to: string
  rel?: string
  style?: React.CSSProperties
}

type IBtnLinkProps = IBtnProps & ILinkProps

const BtnLinkLink = s(Link)`
  &:focus {
    outline: 0;
    box-shadow: none;

    button {
      box-shadow: 0 0 0 0.2rem ${OUTLINE};
    }
  }
`

// Structure the link differently so that styling props are not passed
// to the DOM where they might cause rendering errors
export const BtnLink = ({ to, fullWidth, ...rest }: IBtnLinkProps) => (
  <BtnLinkLink to={to}>
    <BtnBtn fullWidth={fullWidth} {...rest} tabIndex={-1} />
  </BtnLinkLink>
)

interface IInputProps {
  type?: string
  value?: any
  name?: string
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
}

type IBtnInputProps = IBtnProps & IInputProps

const BtnInputTag = s.input<IBtnInputProps>(Btn)

/**
 * Button to be used in form (primarily for submitting said form).
 *
 * @param props.style    - to apply to the button
 * @param props.disabled - if the button should be unclickable and slightly
 *                      transparent
 * @param ...others
 */
export const BtnInput = ({
  style,
  ...rest
}: IBtnInputProps & { pending?: boolean }) => (
  <BtnInputTag style={{ marginBottom: 0, ...style }} {...rest} />
)

export const Buttons = s.div`
  a,
  input {
    display: inline-block;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

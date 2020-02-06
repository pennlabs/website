import React, { ReactElement, ReactNode } from 'react'
import s, { css, FlattenSimpleInterpolation } from 'styled-components'

import { minWidth, maxWidth, PHONE, TABLET } from '../constants/measurements'

const percent = (numCols: number): string => (numCols / 12) * 100 + '%'

export const Section = s.section<{}>`
  padding-top: 7.5vh;
  padding-bottom: 7.5vh;

  ${maxWidth(PHONE)} {
    padding-top: 5vh;
    padding-bottom: 5vh;
  }
`

interface IContainerTagProps {
  background?: string
}

export const Container = s.div<IContainerTagProps>`
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;
  display: block;
  background: ${({ background }) => background || 'transparent'};

  ${minWidth(PHONE)} {
    padding-right: calc(1rem + 2.5%);
    padding-left: calc(1rem + 2.5%);
  }

  ${minWidth(TABLET)} {
    padding-right: calc(1rem + 5%);
    padding-left: calc(1rem + 5%);
  }
`

interface ISpacerProps {
  hiddenOnMobile?: boolean
}

export const Spacer = s.div<ISpacerProps>`
  display: block;
  width: 100%;
  height: 1rem;
  ${({ hiddenOnMobile }) =>
    hiddenOnMobile &&
    `
    ${maxWidth(PHONE)} {
      display: none;
    }
  `}
`

export const Flex = s.div`
  width: 100%;
  display: flex;
`

export const VFlex = s(Flex)`
  flex-direction: column;
`

interface IRowProps {
  margin?: string
  alwaysFlex?: boolean
}

export const Row = s.div<IRowProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;

  ${({ alwaysFlex }) => !alwaysFlex && `${maxWidth(PHONE)} { display: block; }`}

  ${({ margin }) =>
    margin &&
    `
    margin-left: -${margin};
    margin-right: -${margin};
    width: calc(100% + ${margin} + ${margin});
  `}
`

export interface IColProps {
  width?: string
  sm?: number
  offsetSm?: number
  md?: number
  offsetMd?: number
  lg?: number
  offsetLg?: number
  flex?: boolean
  margin?: string
  children?: ReactNode
  overflowY?: 'visibile' | 'scroll' | 'hidden' | 'auto'
  background?: string
}

const ColWrapper = s.div<IColProps>(
  ({
    width,
    overflowY,
    sm,
    offsetSm,
    md,
    offsetMd,
    lg,
    offsetLg,
    flex,
  }): FlattenSimpleInterpolation => css`
    flex: ${width ? 'none' : 1};
    width: ${width || 'auto'};
    overflow-y: ${overflowY || 'visible'};
    overflow-x: visible;

    ${sm && `width: ${percent(sm)}; flex: none;`}
    ${(offsetSm || offsetSm === 0) && `margin-left: ${percent(offsetSm)};`}

    ${minWidth(PHONE)} {
      ${md && `width: ${percent(md)}; flex: none;`}
      ${(offsetMd || offsetMd === 0) && `margin-left: ${percent(offsetMd)};`}
    }

    ${minWidth(TABLET)} {
      ${lg && `width: ${percent(lg)}; flex: none;`}
      ${(offsetLg || offsetLg === 0) && `margin-left: ${percent(offsetLg)};`}
    }

    ${flex && `display: flex;`}
  `,
)

const ColContainer = s.div<IColProps>(
  ({ background, flex, margin }): FlattenSimpleInterpolation => css`
    background: ${background || 'transparent'};
    overflow-x: visible;
    position: relative;

    ${flex && `display: flex; flex: 1;`}
    ${margin && `margin-left: ${margin}; margin-right: ${margin};`}
  `,
)

export const Col = ({
  margin,
  children,
  background,
  flex,
  ...other
}: IColProps) => (
  <ColWrapper flex={flex} {...other}>
    <ColContainer flex={flex} margin={margin} background={background}>
      {children}
    </ColContainer>
  </ColWrapper>
)

export interface IColSpaceProps {
  width?: string
}

export const ColSpace = s(Col)<IColSpaceProps>`
  flex: none;
  width: ${({ width }) => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`

interface IContainerProps {
  children: ReactNode
  background?: string
  foreground?: string
}

export const WideContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={11} offsetMd={0.5} lg={10} offsetLg={1}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const MediumContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={8} offsetMd={2} lg={6} offsetLg={3}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const ThinContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={8} offsetMd={2} lg={5} offsetLg={3.5}>
        {children}
      </Col>
    </Row>
  </Container>
)

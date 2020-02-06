import React from 'react'
import styled from 'styled-components'
import GatsbyImage, { FluidObject } from 'gatsby-image'
import { ReactChildren } from '../../types'
import { Row, Col, Container, Fade } from '../../shared'
import { maxWidth, TABLET, PHONE } from '../../constants/measurements'

const Image = styled.img<{ isEven: boolean }>`
  width: 100%;

  ${maxWidth(TABLET)} {
    ${props => (props.isEven ? 'padding-left: 15%;' : 'padding-right: 15%;')}
  }

  ${maxWidth(PHONE)} {
    ${props => (props.isEven ? 'padding-left: 1rem;' : 'padding-right: 1rem;')}
  }
`

const Img = props => <Image as={GatsbyImage} {...props} />

const StyledContainer = styled(Container)<{ isEven: boolean }>`
  display: flex;
  justify-content: center;
  align-items: ${props => (props.isEven ? 'flex-end' : 'flex-start')};
  flex-direction: column;

  ${props =>
    props.isEven &&
    `
    * {
      text-align: right;
    }
  `}

  ${maxWidth(TABLET)} {
    display: block;
    text-align: center !important;

    * {
      text-align: center !important;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      width: 100%;
    }
  }
`

interface IProductOverviewProps {
  isRight: boolean
  children: ReactChildren
  fluid: FluidObject
}

export const ProductOverview = ({
  isRight,
  fluid,
  children,
}: IProductOverviewProps) => (
  <Row
    style={{
      flexDirection: isRight ? 'row-reverse' : 'row',
      marginTop: '3rem',
      marginBottom: '3rem',
    }}
  >
    {fluid && (
      <Col sm={12} md={12} lg={6}>
        <Fade distance="1.45rem">
          <Img fluid={fluid} isEven={isRight} />
        </Fade>
      </Col>
    )}
    <Col sm={12} md={12} lg={6} flex>
      <StyledContainer isEven={isRight}>{children}</StyledContainer>
    </Col>
  </Row>
)

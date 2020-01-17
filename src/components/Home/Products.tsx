import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import {
  H1,
  P,
  H2,
  Section,
  Container,
  Col,
  Row,
  LinkChevronRight,
  ParallaxWrapper,
} from '../../shared'
import { INTER } from '../../constants/fonts'
import { maxWidth, TABLET, PHONE } from '../../constants/measurements'
import { Blob3, Blob4 } from './Blobs'
import { Parallax } from 'react-scroll-parallax'

const pcrImg = require('../../images/products/pcr-home.svg') as string // tslint:disable-line
const pennMobileImg = require('../../images/products/penn-mobile-home.svg') as string // tslint:disable-line
const pennClubsImg = require('../../images/products/clubs-home.svg') as string // tslint:disable-line

const Image = styled.img<{ isEven: boolean }>`
  width: 100%;

  ${maxWidth(TABLET)} {
    ${props => (props.isEven ? 'padding-left: 15%;' : 'padding-right: 15%;')}
  }

  ${maxWidth(PHONE)} {
    ${props => (props.isEven ? 'padding-left: 1rem;' : 'padding-right: 1rem;')}
  }
`

const StyledContainer = styled(Container)<{ isEven: boolean }>`
  display: flex;
  justify-content: center;
  align-items: ${props => (props.isEven ? 'flex-end' : 'flex-start')};
  flex-direction: column;

  ${maxWidth(TABLET)} {
    display: block;
    text-align: center;
  }
`

interface IProductOverview {
  title: string
  description: string
  slug: string
  image: string
  additionalComponent?: React.ReactNode
}

const productOverviews: IProductOverview[] = [
  {
    title: 'Penn Course Review',
    description: 'Professor and course ratings',
    slug: 'penn-course-review',
    image: pcrImg,
    additionalComponent: <Blob3 />,
  },
  {
    title: 'Penn Mobile',
    description: 'Campus essentials, on the go',
    slug: 'penn-mobile',
    image: pennMobileImg,
  },
  {
    title: 'Penn Clubs',
    description: 'Discover clubs all year-round',
    slug: 'penn-clubs',
    image: pennClubsImg,
    additionalComponent: <Blob4 />,
  },
]

export const Products = (): React.ReactElement => (
  <Section>
    <Container>
      <ParallaxWrapper>
        <H1>Our products</H1>
        <P>For academics, campus life, and everything in-between</P>
      </ParallaxWrapper>
    </Container>

    {productOverviews.map(
      (
        {
          title,
          description,
          slug,
          image,
          additionalComponent,
        }: IProductOverview,
        idx: number,
      ) => {
        const isEven: boolean = idx % 2 === 0
        return (
          <React.Fragment key={title}>
            {additionalComponent || null}
            <Row
              style={{
                flexDirection: isEven ? 'row-reverse' : 'row',
                marginTop: '3rem',
                marginBottom: '3rem',
              }}
            >
              <Col sm={12} md={12} lg={6}>
                <Image src={image} isEven={isEven} />
              </Col>
              <Col sm={12} md={12} lg={6} flex>
                <StyledContainer isEven={isEven}>
                  <H2 style={{ marginBottom: '0.5rem', fontFamily: INTER }}>
                    {title}
                  </H2>
                  <P lg>{description}</P>
                  <Link to={slug} style={{ marginBottom: 0 }}>
                    Learn more <LinkChevronRight />
                  </Link>
                </StyledContainer>
              </Col>
            </Row>
          </React.Fragment>
        )
      },
    )}
  </Section>
)

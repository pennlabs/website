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
  ChevronRight,
} from '../../shared'
import { INTER } from '../../constants/fonts'
import { maxWidth, PHONE } from '../../constants/measurements'

const pcrImg = require('../../images/products/pcr-home.svg') as string // tslint:disable-line
const pennMobileImg = require('../../images/products/penn-mobile-home.svg') as string // tslint:disable-line
const pennClubsImg = require('../../images/products/clubs-home.svg') as string // tslint:disable-line

const Image = styled.img`
  width: 100%;
`

const StyledContainer = styled(Container)<{ isEven: boolean }>`
  text-align: ${props => (props.isEven ? 'right' : 'left')};
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${maxWidth(PHONE)} {
    display: block;
    text-align: center;
  }
`

interface IProductOverview {
  title: string
  description: string
  slug: string
  image: string
}

const productOverviews: IProductOverview[] = [
  {
    title: 'Penn Course Review',
    description: 'Professor and course ratings',
    slug: 'penn-course-review',
    image: pcrImg,
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
  },
]

export const Products = (): React.ReactElement => (
  <Section>
    <Container>
      <H1>Our products</H1>
      <P>For academics, campus life, and everything in-between</P>
    </Container>

    {productOverviews.map(
      ({ title, description, slug, image }: IProductOverview, idx: number) => {
        const isEven: boolean = idx % 2 === 0
        return (
          <Row
            style={{
              flexDirection: isEven ? 'row-reverse' : 'row',
              marginTop: '3rem',
              marginBottom: '3rem',
            }}
          >
            <Col>
              <Image src={image} />
            </Col>
            <Col flex>
              <StyledContainer>
                <H2 style={{ marginBottom: '0.5rem', fontFamily: INTER }}>
                  {title}
                </H2>
                <P lg>{description}</P>
                <Link to={slug} style={{ marginBottom: 0 }}>
                  Learn more{' '}
                  <ChevronRight
                    style={{
                      marginTop: '-6px',
                      marginLeft: '-4px',
                      marginBottom: '-7px',
                      marginRight: '-8px',
                      transform: 'scale(0.75)',
                    }}
                  />
                </Link>
              </StyledContainer>
            </Col>
          </Row>
        )
      },
    )}
  </Section>
)

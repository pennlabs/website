import React from 'react'

import { H1, P, H3, Section, Container, Col, Row } from '../../shared'
import { Link } from 'gatsby'

interface IProductOverview {
  title: string
  description: string
  slug: string
}

// TODO images

const productOverviews: IProductOverview[] = [
  {
    title: 'Penn Course Review',
    description: 'Professor and course ratings',
    slug: 'penn-course-review',
  },
  {
    title: 'Penn Mobile',
    description: 'Campus essentials, on the go',
    slug: 'penn-mobile',
  },
  {
    title: 'Penn Clubs',
    description: 'Discover clubs all year-round',
    slug: 'penn-clubs',
  },
]

export const Products = (): React.ReactElement => (
  <Section>
    <Container>
      <H1>Our products</H1>
      <P>For academics, campus life, and everything in-between</P>
    </Container>

    {productOverviews.map(
      ({ title, description, slug }: IProductOverview, idx: number) => {
        const isEven: boolean = idx % 2 === 0
        return (
          <Row style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}>
            <Col>Image Goes Here</Col>
            <Col>
              <Container>
                <H3>{title}</H3>
                <P>{description}</P>
                <Link to={slug}>Learn more &rarr;</Link>
              </Container>
            </Col>
          </Row>
        )
      },
    )}
  </Section>
)

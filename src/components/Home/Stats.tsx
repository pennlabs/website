import React from 'react'
import styled from 'styled-components'

import {
  H1,
  H2,
  P,
  Container,
  Section,
  Row,
  Col,
  ParallaxWrapper,
} from '../../shared'
import { TEAL, PINK, GREEN, WHITE } from '../../constants/colors'
import {
  BORDER_RADIUS_LG,
  M2,
  maxWidth,
  PHONE,
} from '../../constants/measurements'
import { Blob2 } from './Blobs'

const StatWrapper = styled.div<{ color: string }>`
  background: ${props => props.color};
  padding: 1rem;
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 1.5rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

interface IStat {
  color: string
  title: string
  description: string
}

const stats: IStat[] = [
  {
    color: TEAL,
    title: '9 years',
    description: 'of supporting the Penn community',
  },
  {
    color: PINK,
    title: '100k unique users',
    description: 'across 11 student-developed applications',
  },
  {
    color: GREEN,
    title: '$930k handled',
    description: 'through our Common Funding Application',
  },
]

export const Stats = (): React.ReactElement => (
  <Section>
    <Blob2 />
    <Container>
      <ParallaxWrapper>
        <H1>By the numbers</H1>
        <P>Here's what we've gotten done</P>
        <Row margin={M2}>
          {stats.map(({ color, title, description }: IStat) => (
            <Col sm={12} md={4} margin={M2} flex key={title}>
              <StatWrapper color={color}>
                <H2 color={WHITE}>{title}</H2>
                <P color={WHITE} opacity={0.8} mb0>
                  {description}
                </P>
              </StatWrapper>
            </Col>
          ))}
        </Row>
      </ParallaxWrapper>
    </Container>
  </Section>
)

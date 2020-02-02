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
  Fade,
  Blob2,
} from '../../shared'
import {
  WHITE,
  TEAL_ALPHA,
  PINK_ALPHA,
  GREEN_ALPHA,
} from '../../constants/colors'
import {
  BORDER_RADIUS_LG,
  M2,
  maxWidth,
  PHONE,
} from '../../constants/measurements'

const StatWrapper = styled.div<{ colorAlpha: (a: number) => string }>`
  background: ${props => props.colorAlpha(1)};
  padding: 1rem;
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 1.5rem;
  width: 100%;
  box-shadow: 0 1px 8px ${props => props.colorAlpha(0.5)};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

interface IStat {
  colorAlpha: (a: number) => string
  title: string
  description: string
}

const stats: IStat[] = [
  {
    colorAlpha: TEAL_ALPHA,
    title: '9 years',
    description: 'of supporting the Penn community',
  },
  {
    colorAlpha: PINK_ALPHA,
    title: '100k unique users',
    description: 'across 11 student-developed applications',
  },
  {
    colorAlpha: GREEN_ALPHA,
    title: '$930k handled',
    description: 'through our Common Funding Application',
  },
]

export const Stats = (): React.ReactElement => (
  <Section>
    <Blob2 />
    <Container>
      <ParallaxWrapper>
        <Fade delay={400}>
          <div>
            <H1>By the numbers</H1>
            <P>Here's what we've gotten done</P>
          </div>
        </Fade>
        <Fade delay={800}>
          <Row margin={M2}>
            {stats.map(({ colorAlpha, title, description }: IStat) => (
              <Col sm={12} md={4} margin={M2} flex key={title}>
                <StatWrapper colorAlpha={colorAlpha}>
                  <H2 color={WHITE}>{title}</H2>
                  <P color={WHITE} opacity={0.8} mb0>
                    {description}
                  </P>
                </StatWrapper>
              </Col>
            ))}
          </Row>
        </Fade>
      </ParallaxWrapper>
    </Container>
  </Section>
)

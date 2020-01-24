import React from 'react'
import styled from 'styled-components'

import { M2 } from '../constants/measurements'
import { Section, Row, Col } from './Grid'
import { Fade } from './Fade'
import { H1, H3, P } from './Typography'

const TextWrapper = styled.div<{}>`
  align-self: center;
`

interface IHeroProps {
  Image: React.ReactNode
  title: string
  subtitle: string
  body: string
}

export const Hero = ({ Image, title, subtitle, body }: IHeroProps) => {
  return (
    <Section>
      <Row margin={M2}>
        <Col sm={12} md={6} margin={M2} flex>
          <TextWrapper>
            <Fade delay={400}>
              <H1 mb1>{title}</H1>
            </Fade>
            <Fade delay={500}>
              <H3 normal>{subtitle}</H3>
            </Fade>
            <Fade delay={600}>
              <P>{body}</P>
            </Fade>
          </TextWrapper>
        </Col>
        <Col sm={12} md={6} margin={M2}>
          <Fade delay={400} distance="1rem">
            {Image}
          </Fade>
        </Col>
      </Row>
    </Section>
  )
}

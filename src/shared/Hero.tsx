import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { M1, M2, M3, maxWidth, DESKTOP, PHONE } from '../constants/measurements'
import { Section, Row, Col } from './Grid'
import { Fade } from './Fade'
import { H1, H3, P } from './Typography'

const TextWrapper = styled.div<{}>`
  align-self: center;
`

const ImgWrapper = styled.div<{}>`
  ${maxWidth(DESKTOP)} {
    padding-left: 5%;
    width: 100%;
  }

  ${maxWidth(PHONE)} {
    padding: 0 10%;
    width: 100%;
  }
`

interface IHeroProps {
  Image: React.ReactNode
  title: string
  subtitle: string
  body?: string | ReactNode

  /**
   * If the image should be wrapped in a `<Fade />` component or not.
   *
   * Set this to false when there are other async / transition related events
   * which are needed for the image to load properly
   *
   * For example, if using a lazy load gatsby-image, this should be false
   */
  shouldFadeImage?: boolean
}

export const Hero = ({
  Image,
  title,
  subtitle,
  body,
  shouldFadeImage = true,
}: IHeroProps) => {
  return (
    <Section>
      <Row margin={M2}>
        <Col sm={12} md={6} margin={M2} flex>
          <TextWrapper>
            <Fade delay={400} distance={M1}>
              <H1 mb1>{title}</H1>
            </Fade>
            <Fade delay={450} distance={M1}>
              <H3 normal>{subtitle}</H3>
            </Fade>
            {body && (
              <Fade delay={500} distance={M1}>
                <P>{body}</P>
              </Fade>
            )}
          </TextWrapper>
        </Col>
        <Col sm={12} md={6} margin={M2}>
          {shouldFadeImage ? (
            <Fade delay={400} distance="1rem">
              <ImgWrapper>{Image}</ImgWrapper>
            </Fade>
          ) : (
            <ImgWrapper>{Image}</ImgWrapper>
          )}
        </Col>
      </Row>
    </Section>
  )
}

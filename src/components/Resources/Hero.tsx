import React from 'react'
import styled from 'styled-components'

import { Section, Row, Col, H1, H3, P } from '../../shared'
import { M2 } from '../../constants/measurements'

const deskPath = require('../../images/hero-resources.svg') as string // tslint:disable-line

const Desk = styled.img`
  width: 90%;
  margin-left: 5%;
  height: auto;
`

const TextWrapper = styled.div<{}>`
  align-self: center;
`

export const Hero = () => (
  <Section>
    <Row margin={M2}>
      <Col sm={12} md={6} margin={M2} flex>
        <TextWrapper>
          <H1 mb1>Resources</H1>
          <H3 style={{ fontWeight: 400 }}>
            Tutorials and data for building your own products
          </H3>
          <P>
            We're dedicated to giving back to the community—here are some guides
            and tutorials we've written to help everybody build products like
            ours. We also maintain free APIs and SDKs with support for
            Javascript, Python, Ruby and OAuth.
          </P>
        </TextWrapper>
      </Col>
      <Col sm={12} md={6} margin={M2}>
        <Desk src={deskPath} />
      </Col>
    </Row>
  </Section>
)

import React from 'react'
import styled from 'styled-components'

import { H1, P, Container, Row, Col } from '../../shared'
import { maxWidth, TABLET } from '../../constants/measurements'

const blob1Path = require('../../images/blob1.svg') as string // tslint:disable-line
const devicesPath = require('../../images/hero-devices.svg') as string // tslint:disable-line

const StyledBlob = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: auto;
  z-index: -2;

  ${maxWidth(TABLET)} {
    width: 90%;
  }
`

const StyledDevices = styled.img`
  position: absolute;
  right: 0;
  width: calc(50% - 2rem);
  top: 1rem;
  height: auto;
  z-index: -1;

  ${maxWidth(TABLET)} {
    position: relative;
    width: 75%;
    margin-left: 25%;
  }
`

const TextContainer = styled(Container)`
  margin-top: 20vh;
  margin-bottom: 20vh;

  ${maxWidth(TABLET)} {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`

export const Hero = (): React.ReactElement => (
  <>
    <StyledBlob src={blob1Path} />
    <TextContainer>
      <Row>
        <Col sm={12} lg={6}>
          <H1>Built for students, by students</H1>
          <P lg mb0>
            We're connecting students, resources, and data to improve life at
            Penn.
          </P>
        </Col>
      </Row>
    </TextContainer>
    <StyledDevices src={devicesPath} />
  </>
)

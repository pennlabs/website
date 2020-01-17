import React from 'react'
import styled from 'styled-components'

import { H1, P, Container, Row, Col } from '../../shared'
import {
  maxWidth,
  TABLET,
  minWidth,
  DESKTOP,
} from '../../constants/measurements'
import { Blob1 } from './Blobs'

const devicesPath = require('../../images/hero-devices.svg') as string // tslint:disable-line

const DesktopStyledDevices = styled.div`
  position: absolute;
  right: 0;
  width: calc(50% - 2rem);
  top: 1rem;
  height: calc(100vh + 4rem);
  z-index: -1;
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const MobileStyledDevices = styled.img`
  width: 75%;
  height: auto;
  margin-left: 25%;

  ${minWidth(TABLET)} {
    display: none;
  }
`

const TextContainer = styled(Container)`
  margin-top: calc(50vh - 96px);
  margin-bottom: calc(50vh - 80px);

  ${maxWidth(TABLET)} {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  ${minWidth(DESKTOP)} {
    margin-top: calc(44vh - 96px);
    margin-bottom: calc(50vh - 80px);
  }
`

const StyledH1 = styled(H1)`
  ${minWidth(DESKTOP)} {
    font-size: 4.25vw;
  }
`

const StyledP = styled(P)`
  ${minWidth(DESKTOP)} {
    font-size: 1.75vw;
  }
`

export const Hero = (): React.ReactElement => (
  <>
    <Blob1 />
    <DesktopStyledDevices style={{ backgroundImage: `url(${devicesPath})` }} />
    <TextContainer>
      <Row>
        <Col sm={12} lg={6}>
          <StyledH1>Built for students, by students</StyledH1>
          <StyledP lg mb0>
            We're connecting students, resources, and data to improve life at
            Penn.
          </StyledP>
        </Col>
      </Row>
    </TextContainer>
    <MobileStyledDevices src={devicesPath} />
  </>
)

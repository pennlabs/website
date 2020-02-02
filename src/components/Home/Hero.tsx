import React from 'react'
import styled, { keyframes } from 'styled-components'

import {
  H1,
  P,
  Container,
  Row,
  Col,
  BtnLink,
  LinkExternalLinkIcon,
  Fade,
  Blob1,
} from '../../shared'
import {
  maxWidth,
  TABLET,
  minWidth,
  DESKTOP,
} from '../../constants/measurements'
import { GITHUB_ROUTE, PRODUCTS_ROUTE } from '../../constants/routes'

const devicesPath = require('../../images/hero-devices.svg') as string // tslint:disable-line
const mobileDevicesPath = require('../../images/hero-devices-mobile.svg') as string // tslint:disable-line

const fade = keyframes`
  0% {
    opacity: 0;
    transform: translate(1%, 2%);
  }

  50% {
    opacity: 0.5;
    transform: translate(0, 0);
  }

  100% {
    opacity: 1;
  }
`

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
  background-image: url(${devicesPath});
  animation: ${fade} 600ms ease-out;

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const MobileStyledDevices = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0;

  ${minWidth(TABLET)} {
    display: none;
  }
`

const TextContainer = styled(Container)`
  margin-top: calc(50vh - 96px);
  margin-bottom: calc(50vh - 80px);

  ${maxWidth(TABLET)} {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  ${minWidth(DESKTOP)} {
    margin-top: calc(40vh - 96px);
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
    <DesktopStyledDevices />
    <TextContainer>
      <Row>
        <Col sm={12} md={8} lg={6}>
          <Fade delay={400}>
            <StyledH1>Built for students, by students</StyledH1>
          </Fade>
          <Fade delay={800}>
            <StyledP lg>
              We're connecting students, resources, and data to improve life at
              Penn.
            </StyledP>
          </Fade>
          <Fade delay={1200}>
            <div>
              <BtnLink to={PRODUCTS_ROUTE} style={{ marginRight: '1rem' }}>
                View Products
              </BtnLink>
              <a href={GITHUB_ROUTE} target="_BLANK">
                GitHub <LinkExternalLinkIcon />
              </a>
            </div>
          </Fade>
        </Col>
      </Row>
    </TextContainer>
    <MobileStyledDevices src={mobileDevicesPath} />
  </>
)

import React from 'react'
import styled from 'styled-components'
import { maxWidth, PHONE, TABLET } from '../../constants/measurements'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxWrapper } from '../../shared'

const blob1Path = require('../../images/blob1.svg') as string // tslint:disable-line
const blob2Path = require('../../images/blob2-partial.svg') as string // tslint:disable-line
const blob3Path = require('../../images/blob3.svg') as string // tslint:disable-line
const blob4Path = require('../../images/blob4.svg') as string // tslint:disable-line

const Blob1Tag = styled.img`
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

export const Blob1 = () => <Blob1Tag src={blob1Path} />

const Blob2Tag = styled.img<{}>`
  position: absolute;
  right: 0;
  width: 20%;
  height: auto;
  z-index: -1;

  ${maxWidth(PHONE)} {
    width: 45%;
  }
`

export const Blob2 = () => <Blob2Tag src={blob2Path} />

export const Blob3 = styled.div`
  margin-top: 40vh;
  margin-left: 5%;
  width: 90%;
  height: 80vh;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${blob3Path});
  position: absolute;
  z-index: -1;
`

const Blob4Tag = styled.img`
  width: 36%;
  margin-top: 2rem;
  margin-left: 20%;
  height: auto;
  position: absolute;
  z-index: -1;

  ${maxWidth(PHONE)} {
    margin-left: -5%;
    width: 60%;
    margin-top: 25vh;
  }
`

export const Blob4 = () => <Blob4Tag src={blob4Path} />

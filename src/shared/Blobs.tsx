import React from 'react'
import styled from 'styled-components'
import { maxWidth, PHONE, TABLET } from '../constants/measurements'

const blob1Path = require('../images/blobs/blob1.svg') as string // tslint:disable-line
const blob2Path = require('../images/blobs/blob2-partial.svg') as string // tslint:disable-line
const blob3Path = require('../images/blobs/blob3.svg') as string // tslint:disable-line
const blob4Path = require('../images/blobs/blob4.svg') as string // tslint:disable-line
const blob5Path = require('../images/blobs/blob5.svg') as string // tslint:disable-line

interface IBlobProps {
  style?: React.CSSProperties
}

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

export const Blob1 = (props: IBlobProps) => (
  <Blob1Tag src={blob1Path} {...props} />
)

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

export const Blob2 = (props: IBlobProps) => (
  <Blob2Tag src={blob2Path} {...props} />
)

export const Blob3 = styled.div<IBlobProps>`
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

export const Blob4 = (props: IBlobProps) => (
  <Blob4Tag src={blob4Path} {...props} />
)

export const Blob5Tag = styled.img`
  width: 45%;
  height: auto;
  position: absolute;
  left: -5%;
  top: 5%;

  ${maxWidth(PHONE)} {
    width: 60%;
    left: -10%;
    top: 0;
  }
`

export const Blob5 = (props: IBlobProps) => (
  <Blob5Tag src={blob5Path} {...props} />
)

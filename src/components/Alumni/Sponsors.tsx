import React from 'react'
import { Hero, Img } from '../../shared'
import { M1, M2 } from '../../constants/measurements'
import { Fade, Section, H2, Row, Col, P } from '../../shared'
const janestreet = require('../../images/hero-team.svg') as string // tslint:disable-line
const google = require('../../images/hero-team.svg') as string // tslint:disable-line
const facebook = require('../../images/hero-team.svg') as string // tslint:disable-line
const microsoft = require('../../images/hero-team.svg') as string // tslint:disable-line

const sponsors = [janestreet, google, facebook, microsoft]

export const Sponsors = () => (
  <Hero
    title="Sponsors"
    subtitle="Those who make it possible"
    Image={<ImgGrid imgs={sponsors} />}
  />
)

interface ISponsorGrid {
    imgs: string[]
}

const ImgGrid =  ({ imgs }: ISponsorGrid)=> (
    <Row margin={M1}>
      {imgs.map((img: string) => (
        <div style={{width: '50%', textAlign:'center'}}>
            <Img src={img} width="80%" style={{display: 'block'}}/>
        </div>
      ))}
    </Row>
  )
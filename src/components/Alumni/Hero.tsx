import React from 'react'
import { Hero, Img } from '../../shared'

const imgPath = require('../../images/hero-team.svg') as string // tslint:disable-line

export const AlumniHero = () => (
  <Hero
    title="Past Penn Labs Members"
    subtitle="The people (formerly) behind the products"
    body={`
      Those who came before us.
    `}
    Image={<Img src={imgPath} fullWidth mb0 />}
  />
)

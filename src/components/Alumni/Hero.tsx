import React from 'react'
import { Hero, Img } from '../../shared'

const imgPath = require('../../images/hero-team.svg') as string // tslint:disable-line

export const AlumniHero = () => (
  <Hero
    title="Alumni"
    subtitle="Where we came from"
    body={`
      Really cool people.
    `}
    Image={<Img src={imgPath} fullWidth mb0 />}
  />
)

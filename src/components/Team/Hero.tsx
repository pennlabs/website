import React from 'react'
import { Hero } from '../../shared'

const imgPath = require('../../images/hero-team.svg') as string // tslint:disable-line

export const TeamHero = () => (
  <Hero
    title="Team"
    subtitle="TODO"
    body={`TODO`}
    Image={<img src={imgPath} />}
  />
)

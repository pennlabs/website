import React from 'react'
import { Hero, Img } from '../../shared'

const imgPath = require('../../images/hero-team.svg') as string // tslint:disable-line

export const TeamHero = () => (
  <Hero
    title="Our Team"
    subtitle="The people behind the products"
    body={`
      Our products wouldn't exist without the commitment and hard work of our
      members. We recruit the best rising students at Penn to build the next
      generation of products. We structure our club to optimize for education
      and mobility between technologies and teams. At the end of the day, we’re
      a family that builds, learns, and plays together.
    `}
    Image={<Img src={imgPath} fullWidth mb0 />}
  />
)

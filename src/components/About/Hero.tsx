import React from 'react'
import { Hero, Img } from '../../shared'

const productsPath = require('../../images/hero-products.svg') as string // tslint:disable-line

export const AboutHero = () => {
  return (
    <Hero
      Image={<Img src={productsPath} fullWidth mb0 />}
      title="About Penn Labs"
      subtitle="A Story of Building Tools that Matter"
      body={`
        We’re a team of product designers, software engineers, and business
          developers. We believe in improving the Penn community. In addition to creating
          open-source, quality products, we give back with educational resources
          and technical support.
      `}
    />
  )
}

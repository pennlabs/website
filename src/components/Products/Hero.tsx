import React from 'react'
import { Hero } from '../../shared'

const imgPath = require('../../images/product-lab-hero.svg') as string // tslint:disable-line

export const ProductsHero = () => {
  return (
    <Hero
      Image={<img style={{ width: '100%' }} src={imgPath} />}
      title="Products"
      subtitle="TODO"
      body={`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.
      `}
    />
  )
}

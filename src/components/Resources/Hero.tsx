import React from 'react'
import { Hero, Img } from '../../shared'

const deskPath = require('../../images/hero-resources.svg') as string // tslint:disable-line

export const ResourcesHero = () => (
  <Hero
    title="Resources"
    subtitle="Tutorials and data for building your own products"
    body={`
      We're dedicated to giving back to the community—here are some guides
      and tutorials we've written to help everybody build products like
      ours. We also maintain free APIs and SDKs with support for
      Javascript, Python, Ruby and OAuth.
    `}
    Image={<Img src={deskPath} fullWidth mb0 />}
  />
)

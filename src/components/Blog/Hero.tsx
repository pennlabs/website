import React from 'react'
import { Hero, Img } from '../../shared'

const blogPath = require('../../images/hero-blog.svg') as string // tslint:disable-line

export const BlogHero = () => (
  <Hero
    title="Blog"
    subtitle="Thoughts and tidbits from our team"
    Image={<Img src={blogPath} fullWidth mb0 />}
  />
)

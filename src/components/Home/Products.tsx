import React from 'react'

import { H1, P, H3 } from '../../shared'
import { Link } from 'gatsby'

interface IProductOverview {
  title: string
  description: string
  slug: string
}

// TODO images

const productOverviews: IProductOverview[] = [
  {
    title: 'Penn Course Review',
    description: 'Professor and course ratings',
    slug: 'penn-course-review',
  },
  {
    title: 'Penn Mobile',
    description: 'Campus essentials, on the go',
    slug: 'penn-mobile',
  },
  {
    title: 'Penn Clubs',
    description: 'Discover clubs all year-round',
    slug: 'penn-clubs',
  },
]

export const Products = (): React.ReactElement => (
  <div>
    <H1>Our products</H1>
    <P>For academics, campus life, and everything in-between</P>
    <div>
      {productOverviews.map(({ title, description, slug }) => (
        <div key={slug}>
          <H3>{title}</H3>
          <P>{description}</P>
          <Link to={slug}>Learn more &rarr;</Link>
        </div>
      ))}
    </div>
  </div>
)

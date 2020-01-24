import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Hero } from '../../shared'

export const ProductsHero = () => {
  const {
    file: { childImageSharp },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "test-products-hero.png" }) {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Hero
      Image={<Img style={{ width: '100%' }} fluid={childImageSharp.fluid} />}
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

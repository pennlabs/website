import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Hero, Blob5, Blob2 } from '../../shared'
import { BORDER_RADIUS_LG } from '../../constants/measurements'

export const AboutHero = () => {
  const data = useStaticQuery(graphql`
    query {
      aboutHeroImg: file(relativePath: { eq: "labs-group-fall19.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 848) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const {
    aboutHeroImg: {
      childImageSharp: { fluid },
    },
  } = data

  return (
    <>
      <Blob5 />
      <Blob2 style={{ marginTop: '15%' }} />
      <Hero
        Image={
          <Img
            fluid={fluid}
            style={{
              marginBottom: '0',
              width: '100%',
              borderRadius: BORDER_RADIUS_LG,
            }}
          />
        }
        shouldFadeImage={false}
        title="About Penn Labs"
        subtitle="A Story of Building Tools that Matter"
        body={`
        We’re a team of product designers, software engineers, and business
          developers. We believe in improving the Penn community. In addition to creating
          open-source, quality products, we give back with educational resources
          and technical support.
      `}
      />
    </>
  )
}

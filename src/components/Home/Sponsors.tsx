import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import {
  H1,
  P,
  Container,
  Section,
  Row,
  Col,
  ParallaxWrapper,
  Fade,
  Blob2,
} from '../../shared'
import { M2 } from '../../constants/measurements'

export const Sponsors = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      jane_street: file(relativePath: { eq: "sponsors/jane_street.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      imc: file(relativePath: { eq: "sponsors/imc.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const logos = [
    {
      fluid: data.jane_street.childImageSharp.fluid,
      alt: 'Jane Street',
    },
    {
      fluid: data.imc.childImageSharp.fluid,
      alt: 'IMC Trading',
    },
  ]

  return (
    <Section>
      <Blob2 />
      <Container>
        <ParallaxWrapper>
          <Fade delay={400}>
            <div>
              <H1>Sponsors</H1>
              <P>
                Sponsors help us keep our tools online and support our mission
                to improve the Penn community with open-source, student-built
                products. Reach out to us at contact@pennlabs.org for more
                information on our sponsorship packages and prospectus.
              </P>
            </div>
          </Fade>
          <Fade delay={800}>
            <Row margin={M2}>
              {logos.map(({ fluid, alt }) => (
                <Col sm={12} md={4} key={alt}>
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <Img
                      fluid={fluid}
                      alt={alt}
                      style={{ maxHeight: '100px', maxWidth: '60%' }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Fade>
        </ParallaxWrapper>
      </Container>
    </Section>
  )
}

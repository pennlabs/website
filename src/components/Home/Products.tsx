import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import {
  H1,
  P,
  Section,
  Container,
  LinkChevronRightIcon,
  ParallaxWrapper,
  BtnLink,
  Fade,
  Blob3,
  Blob4,
} from '../../shared'
import { INTER } from '../../constants/fonts'
import { M1, M0 } from '../../constants/measurements'
import { PRODUCTS_ROUTE } from '../../constants/routes'
import { getPathFromFileAbsolutePath } from '../../helpers'
import { ProductOverview } from '../Products/ProductOverview'

/**
 * For some of the products on the homepage, we place a blob behind them
 * This is decided by mapping the index of the product to the index in this
 * array. If the entry is falsey or out of bounds, we render no blob.
 */
const productIndexToAdditionalComponent = [<Blob3 />, null, <Blob4 />]

export const Products = (): React.ReactElement => {
  const {
    allMarkdownRemark: { edges: products },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { showOnHomepage: { eq: true } } }
        sort: { order: ASC, fields: frontmatter___orderOnHomepage }
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              description
              title
              justifyImage
              screenshot {
                childImageSharp {
                  fluid(maxWidth: 1256) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Section>
      <Container>
        <Fade>
          <ParallaxWrapper>
            <H1>Our products</H1>
            <P>For academics, campus life, and everything in-between</P>
          </ParallaxWrapper>
        </Fade>
      </Container>

      {products.map(
        (
          {
            node: {
              fileAbsolutePath,
              frontmatter: {
                description,
                title,
                justifyImage,
                screenshot: {
                  childImageSharp: { fluid },
                },
              },
            },
          },
          idx: number,
        ) => {
          const isRight = justifyImage === 'right'

          return (
            <React.Fragment key={fileAbsolutePath}>
              {productIndexToAdditionalComponent[idx] || null}
              <ProductOverview fluid={fluid} isRight={isRight}>
                <Fade>
                  <div style={{ width: '100%' }}>
                    <H1
                      style={{ marginBottom: M1, fontFamily: INTER }}
                      right={isRight}
                    >
                      {title}
                    </H1>
                    <P lg right={isRight}>
                      {description}
                    </P>
                    <P right={isRight} mb0>
                      <Link
                        to={getPathFromFileAbsolutePath(fileAbsolutePath)}
                        style={{ marginBottom: M0 }}
                      >
                        Learn more <LinkChevronRightIcon />
                      </Link>
                    </P>
                  </div>
                </Fade>
              </ProductOverview>
            </React.Fragment>
          )
        },
      )}

      <div style={{ textAlign: 'center' }}>
        <BtnLink to={PRODUCTS_ROUTE}>
          View all products <LinkChevronRightIcon />
        </BtnLink>
      </div>
    </Section>
  )
}

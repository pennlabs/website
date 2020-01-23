import React from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'

// TODO BLOBS

import {
  H1,
  P,
  H2,
  Section,
  Container,
  Col,
  Row,
  LinkChevronRightIcon,
  ParallaxWrapper,
} from '../../shared'
import { INTER } from '../../constants/fonts'
import { maxWidth, TABLET, PHONE } from '../../constants/measurements'
import { Blob3, Blob4 } from './Blobs'
import { getPathFromFileAbsolutePath } from '../../helpers'

const Image = styled.img<{ isEven: boolean }>`
  width: 100%;

  ${maxWidth(TABLET)} {
    ${props => (props.isEven ? 'padding-left: 15%;' : 'padding-right: 15%;')}
  }

  ${maxWidth(PHONE)} {
    ${props => (props.isEven ? 'padding-left: 1rem;' : 'padding-right: 1rem;')}
  }
`

const StyledContainer = styled(Container)<{ isEven: boolean }>`
  display: flex;
  justify-content: center;
  align-items: ${props => (props.isEven ? 'flex-end' : 'flex-start')};
  flex-direction: column;

  ${maxWidth(TABLET)} {
    display: block;
    text-align: center;
  }
`

const productIndexToAdditionalComponent = [<Blob3 />, null, <Blob4 />]

export const Products = (): React.ReactElement => {
  const {
    allMarkdownRemark: { edges: products },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: ASC, fields: frontmatter___order }) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              description
              title
              justifyImage
              image {
                relativePath
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
        <ParallaxWrapper>
          <H1>Our products</H1>
          <P>For academics, campus life, and everything in-between</P>
        </ParallaxWrapper>
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
                image: { relativePath: relativeImagePath },
              },
            },
          },
          idx: number,
        ) => {
          // Dynamically import the image as an SVG
          const image = require(`../../images/${relativeImagePath}`) as string

          const isRight = justifyImage === 'right'
          return (
            <React.Fragment key={fileAbsolutePath}>
              {productIndexToAdditionalComponent[idx] || null}
              <Row
                style={{
                  flexDirection: isRight ? 'row-reverse' : 'row',
                  marginTop: '3rem',
                  marginBottom: '3rem',
                }}
              >
                <Col sm={12} md={12} lg={6}>
                  <Image src={image} isEven={isRight} />
                </Col>
                <Col sm={12} md={12} lg={6} flex>
                  <StyledContainer isEven={isRight}>
                    <H2 style={{ marginBottom: '0.5rem', fontFamily: INTER }}>
                      {title}
                    </H2>
                    <P lg>{description}</P>
                    <Link
                      to={getPathFromFileAbsolutePath(fileAbsolutePath)}
                      style={{ marginBottom: 0 }}
                    >
                      Learn more <LinkChevronRightIcon />
                    </Link>
                  </StyledContainer>
                </Col>
              </Row>
            </React.Fragment>
          )
        },
      )}
    </Section>
  )
}

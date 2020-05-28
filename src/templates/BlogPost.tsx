import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Byline from '../components/Blog/Byline'
import MemberBio from '../components/Blog/MemberBio'
import { Fade, WideContainer } from '../shared'
import { IPost } from '../types'
import { getSrc } from '../helpers'

import { Section, H1, MediumContainer, VFlex, P } from '../shared'

// Ghost gives us HTML classes which need to be styled directly,
// so those styles are included in post.css
import './post.css'
import { M1 } from '../constants/measurements'

interface IPostTemplateProps {
  data: {
    markdownRemark: IPost
  }
}

const PostTemplate = ({ data }: IPostTemplateProps) => {
  const {
    frontmatter: {
      title,
      authors = [],
      coverPhoto,
      publishedAt,
      customExcerpt,
    },
    html,
    excerpt,
    timeToRead,
  } = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={title}
        image={coverPhoto && getSrc(coverPhoto)}
        description={customExcerpt || excerpt}
      />

      <Section>
        <article>
          <header style={{ width: '100%' }}>
            <MediumContainer>
              <H1 mb2>{title}</H1>
              <Byline authors={authors} />
              <P sm opacity={0.64}>
                {publishedAt} • {timeToRead} min read
              </P>
            </MediumContainer>
          </header>

          <MediumContainer>
            {coverPhoto && (
              <Img
                fluid={coverPhoto.childImageSharp.fluid}
                style={{ marginBottom: '2rem' }}
              />
            )}
            <div className={'post-full-content content'}>
              <section
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </div>

            <footer>
              <VFlex>
                {authors &&
                  authors.map(a => <MemberBio key={a.pennkey} author={a} />)}
              </VFlex>
            </footer>
          </MediumContainer>
        </article>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        slug
        title
        customExcerpt
        authors {
          name
          bio
          pennkey
          localImage {
            childImageSharp {
              fluid(maxWidth: 484) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        publishedAt(formatString: "MMM DD, YYYY")
        coverPhoto {
          childImageSharp {
            fluid(maxWidth: 1248) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default PostTemplate

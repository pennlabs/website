import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Byline from '../components/Blog/Byline'
import MemberBio from '../components/Blog/MemberBio'
import { LinkedTags, Fade, WideContainer } from '../shared'
import { IMember, IGhostPost, IPost } from '../types'
import { BLOG_TAG_ROUTE } from '../constants/routes'

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
      coverPhoto: {
        childImageSharp: { fluid },
      },
      publishedAt: publishedAt,
    },
    html,
    excerpt,
    timeToRead,
  } = data.markdownRemark

  return (
    <Layout>
      <SEO title={title} image={fluid.src} description={excerpt} />

      <Section>
        <article>
          <Fade distance={M1}>
            <header style={{ width: '100%' }}>
              <MediumContainer>
                <H1 mb2>{title}</H1>
                <Byline authors={authors} />
                <P sm opacity={0.64}>
                  {publishedAt} • {timeToRead} min read
                </P>
              </MediumContainer>
              {fluid && (
                <WideContainer>
                  <Img fluid={fluid} style={{ width: '100%' }} />
                </WideContainer>
              )}
            </header>
          </Fade>

          <MediumContainer>
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
      frontmatter {
        slug
        title
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
      timeToRead
    }
  }
`

export default PostTemplate

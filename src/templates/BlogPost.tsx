import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Byline from '../components/Blog/Byline'
import MemberBio from '../components/Blog/MemberBio'
import { LinkedTags, Fade, WideContainer } from '../shared'
import { IMember, IGhostPost } from '../types'
import { BLOG_TAG_ROUTE } from '../constants/routes'

import { Section, H1, MediumContainer, VFlex, P } from '../shared'

// Ghost gives us HTML classes which need to be styled directly,
// so those styles are included in post.css
import './post.css'
import { M1 } from '../constants/measurements'

interface IPostTemplateProps {
  data: {
    ghostPost: IGhostPost
    allMember: {
      nodes: IMember[]
    }
  }
}

const PostTemplate = ({ data }: IPostTemplateProps) => {
  const {
    title,
    feature_image,
    localImage: {
      childImageSharp: { fluid },
    },
    html,
    codeinjection_head,
    codeinjection_foot,
    excerpt,
    reading_time: readingTime,
    published_at: publishedAt,
    tags,
  } = data.ghostPost

  const { nodes: authors } = data.allMember
  const htmlContent =
    (codeinjection_head || '') + html + (codeinjection_foot || '')

  const tagToUrl = {}
  tags.forEach(({ name, slug }) => (tagToUrl[name] = BLOG_TAG_ROUTE(slug)))

  return (
    <Layout>
      <SEO title={title} image={feature_image} description={excerpt} />

      <Section>
        <article>
          <Fade distance={M1}>
            <header style={{ width: '100%' }}>
              <MediumContainer>
                <H1 mb2>{title}</H1>
                <P mb1>
                  <LinkedTags tagToUrl={tagToUrl} />
                </P>
                <Byline authorsAsMembers={authors} />
                <P sm opacity={0.64}>
                  {publishedAt} • {readingTime} min read
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
                  __html: htmlContent,
                }}
              />
            </div>

            <footer>
              <VFlex>
                {authors.map(a => (
                  <MemberBio key={a.url} author={a} />
                ))}
              </VFlex>
            </footer>
          </MediumContainer>
        </article>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $authors: [String!]) {
    ghostPost(slug: { eq: $slug }) {
      slug
      title
      html
      codeinjection_head
      codeinjection_foot
      feature_image
      localImage {
        childImageSharp {
          fluid(maxWidth: 1248) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      excerpt
      published_at(formatString: "MMM DD, YYYY")
      reading_time
      tags {
        name
        slug
      }
      authors {
        name
      }
    }
    allMember(filter: { url: { in: $authors } }) {
      nodes {
        photo
        url
        bio
        localImage {
          childImageSharp {
            fluid(maxWidth: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        student {
          name
        }
      }
    }
  }
`

export default PostTemplate

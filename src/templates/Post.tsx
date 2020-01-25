import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Byline from '../components/Blog/Byline'
import MemberBio from '../components/Blog/MemberBio'
import { LinkedTags, HR } from '../shared'
import { IMember, IGhostPost } from '../types'
import { BLOG_TAG_ROUTE } from '../constants/routes'

import { Section, H1, MediumContainer, Card, VFlex, Flex, P } from '../shared'

// Ghost gives us HTML classes which need to be styled directly,
// so those styles are included in post.css
import './post.css'

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
    html,
    codeinjection_head,
    codeinjection_foot,
    excerpt,
    tags,
  } = data.ghostPost

  const authors = data.allMember.nodes
  const htmlContent =
    (codeinjection_head || '') + html + (codeinjection_foot || '')

  const tagToUrl = {}
  tags.forEach(({ name, slug }) => (tagToUrl[name] = BLOG_TAG_ROUTE(slug)))

  return (
    <Layout>
      <SEO title={title} image={feature_image} description={excerpt} />
      <MediumContainer>
        <Section>
          <article>
            <header>
              <H1 mb1>{title}</H1>
              <P mb1>
                <LinkedTags tagToUrl={tagToUrl} />
              </P>
              <Byline authorsAsMembers={authors} />
              <img src={feature_image} />
            </header>
            <div className={'post-full-content content'}>
              <section
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: htmlContent,
                }}
              />
            </div>
            <HR />
            <footer>
              <VFlex>
                {authors.map(a => (
                  <MemberBio author={a} />
                ))}
              </VFlex>
            </footer>
          </article>
        </Section>
      </MediumContainer>
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
      excerpt
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
        student {
          name
        }
      }
    }
  }
`

export default PostTemplate

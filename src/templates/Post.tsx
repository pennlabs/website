import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Byline from '../components/Blog/Byline'
import { IMember, IGhostPost } from '../types'

import { Section, H1, MediumContainer, Card, VFlex, Flex, P } from '../shared'
import { BORDER_RADIUS_LG, minWidth, PHONE } from '../constants/measurements'

// Ghost gives us HTML classes which need to be styled directly,
// so those styles are included in post.css
import './post.css'

const Thumbnail = styled.img`
  max-height: 4rem;
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 0;
  min-height: 10rem;
  margin-left: 1em;

  ${minWidth('0px')} {
    min-height: 5rem;
  }

  ${minWidth(PHONE)} {
    min-height: 10rem;
  }
`

const CenteredFlex = styled(Flex)`
  align-items: center;
`

const AuthorBio = styled.div`
  flex-basis: 2;
`

const AuthorDetail = ({
  author: {
    url,
    photo = '',
    bio = '',
    student: { name },
  },
}) => (
  <Card bordered>
    <CenteredFlex>
      <div>
        <P>{name}</P>
        <P sm dangerouslySetInnerHTML={{ __html: bio }} />
      </div>
      <Thumbnail src={photo} />
    </CenteredFlex>
  </Card>
)

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
  } = data.ghostPost

  const authors = data.allMember.nodes

  const htmlContent =
    (codeinjection_head || '') + html + (codeinjection_foot || '')

  return (
    <Layout>
      <SEO title={title} image={feature_image} description={excerpt} />
      <MediumContainer>
        <Section>
          <article>
            <header>
              <H1>{title}</H1>
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
            <footer>
              <VFlex>
                {authors.map(a => (
                  <AuthorDetail author={a} />
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

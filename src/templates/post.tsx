import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { IMember, Subset } from '../shared/Icons/types'

import {
  Section,
  H1,
  P,
  Tags,
  GitHubIcon,
  LinkedInIcon,
  LinkIcon,
  Row,
  Col,
  BookOpenIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  WideContainer,
  MediumContainer,
} from '../shared'
import {
  M2,
  BORDER_RADIUS_LG,
  M1,
  M3,
  maxWidth,
  PHONE,
  M4,
} from '../constants/measurements'
import { DARK_GRAY } from '../constants/colors'

// Ghost gives us HTML classes which need to be styled directly,
// so those styles are included in post.css
import './post.css'

const PostTemplate = ({ data, location, pageContext }) => {
  const {
    title,
    feature_image,
    html,
    codeinjection_head,
    codeinjection_foot
  } = data.ghostPost

  const authors = data.allMember.nodes

  const htmlContent = codeinjection_head || '' + html + codeinjection_foot || ''
  return (
    <Layout>
      <SEO title={title} />
      <MediumContainer>
        <Section>
          <H1>{title}</H1>
          <pre>{JSON.stringify(authors)}</pre>
          <img src={feature_image} />
          <div className={'post-full-content content'}>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />
          </div>
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
        student {
          name
        }
      }
    }
  }
`

export default PostTemplate

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, H4, Section, Container, Card, P, Flex } from '../shared'
import { BLOG_POST_ROUTE, TEAM_MEMBER_ROUTE } from '../constants/routes'
import { BORDER_RADIUS } from '../constants/measurements'
import { IGhostPost } from '../types'
import Byline from '../components/Blog/Byline'

interface IBlogTemplateProps {
  data: {
    allGhostPost: {
      edges: Array<{ node: IGhostPost }>
    }
  }
}

interface IPostComponentProps {
  post: IGhostPost
}

const PostThumbnail = styled.img`
  max-width: 40%;
  object-fit: contain;
  padding-left: 1rem;
`

const PostCard = styled(Card)`
  width: 50%;
`

const PostContent = styled.div`
  flex-grow: 2;
`

const PostTitle = styled(H4)`
  margin-bottom: 0;
`

const Post = ({
  post: { slug, title, excerpt, feature_image, authors = [] },
}: IPostComponentProps) => {
  return (
    <PostCard bordered hoverable>
      <Link to={BLOG_POST_ROUTE(slug)}>
        <Flex>
          <PostContent>
            <PostTitle>{title}</PostTitle>
            <Byline authors={authors} />
            <P mb1 sm>
              {excerpt}
            </P>
          </PostContent>
          <PostThumbnail src={feature_image} />
        </Flex>
      </Link>
    </PostCard>
  )
}

const BlogPage = ({ data }: IBlogTemplateProps): React.ReactElement => {
  const {
    allGhostPost: { edges: posts },
  } = data

  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <Section>
          <H1>Blog</H1>
          {posts.map(({ node: post }) => (
            <Post key={post.slug} post={post} />
          ))}
        </Section>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          slug
          title
          excerpt
          feature_image
          tags {
            slug
            name
          }
          authors {
            slug
          }
        }
      }
    }
  }
`

export default BlogPage

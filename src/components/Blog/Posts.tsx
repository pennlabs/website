import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Card, VFlex, H3, P, Flex, Fade } from '../../shared'

import { BLOG_POST_ROUTE } from '../../constants/routes'
import {
  BORDER_RADIUS,
  M2,
  M3,
  maxWidth,
  PHONE,
} from '../../constants/measurements'
import { IGhostPost } from '../../types'

const PostThumbnail = styled(Img)`
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: ${BORDER_RADIUS};
  margin-bottom: ${M3};
`

const PostCard = styled(Card)`
  flex-basis: 30%;
  max-width: 50%;
  min-width: 14rem;
  flex-grow: 1;
  margin-right: ${M3};

  ${maxWidth(PHONE)} {
    max-width: none;
    width: 100%;
  }
`

const Post = ({
  slug,
  title,
  excerpt,
  localImage: { childImageSharp: { fluid } } = { childImageSharp: {} },
}: IGhostPost) => {
  return (
    <PostCard bordered hoverable clickable shaded>
      <Link to={BLOG_POST_ROUTE(slug)}>
        <VFlex>
          {fluid && <PostThumbnail fluid={fluid} />}
          <H3 mb2>{title}</H3>
          <P mb1 sm>
            {excerpt}
          </P>
        </VFlex>
      </Link>
    </PostCard>
  )
}

const PostList = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

const Posts = ({ posts }) => (
  <Fade distance={M2}>
    <PostList>
      {posts.map((post: IGhostPost) => (
        <Post key={post.slug} {...post} />
      ))}
    </PostList>
  </Fade>
)

export default Posts

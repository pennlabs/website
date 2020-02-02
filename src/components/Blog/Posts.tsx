import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Card, VFlex, H4, P, Flex } from '../../shared'

import { BLOG_POST_ROUTE } from '../../constants/routes'
import { BORDER_RADIUS } from '../../constants/measurements'
import { IGhostPost } from '../../types'

const PostThumbnail = styled.img`
  object-fit: contain;
  border-radius: ${BORDER_RADIUS};
`

const PostCard = styled(Card)`
  flex-basis: 30%;
  max-width: 50%;
  min-width: 14rem;
  flex-grow: 1;
  margin-right: 1.5rem;
`

const Post = ({
  slug,
  title,
  excerpt,
  feature_image,
}: // authors = [],
IGhostPost) => {
  return (
    <PostCard bordered hoverable>
      <Link to={BLOG_POST_ROUTE(slug)}>
        <VFlex>
          <H4 mb2>{title}</H4>
          <PostThumbnail src={feature_image} />
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
`

const Posts = ({ posts }) => (
  <PostList>
    {posts.map((post: IGhostPost) => (
      <Post key={post.slug} {...post} />
    ))}
  </PostList>
)

export default Posts

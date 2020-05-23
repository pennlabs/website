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
  M4,
} from '../../constants/measurements'
import { IGhostPost, IPost } from '../../types'
import { getSrc } from '../../helpers'

const blogPath = require('../../images/hero-blog.svg') as string // tslint:disable-line

const PostThumbnail = styled(Img)`
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: ${BORDER_RADIUS};
  margin-bottom: ${M3};
`

const PostCardWrapper = styled.div`
  flex-basis: 30%;
  max-width: 50%;
  min-width: 14rem;
  flex-grow: 1;

  ${maxWidth(PHONE)} {
    max-width: none;
    width: 100%;
  }
`

const PostCard = styled(Card)`
  margin-left: 1rem;
  margin-right: 1rem;
`

const Post = ({
  frontmatter: { slug, title, customExcerpt, coverPhoto },
  excerpt,
}: IPost) => {
  return (
    <PostCardWrapper>
      <Link to={BLOG_POST_ROUTE(slug)}>
        <PostCard bordered hoverable clickable shaded>
          <VFlex>
            {coverPhoto && (
              <PostThumbnail fluid={coverPhoto.childImageSharp.fluid} />
            )}
            <H3 mb2>{title}</H3>
            <P mb1 sm>
              {customExcerpt || excerpt}
            </P>
          </VFlex>
        </PostCard>
      </Link>
    </PostCardWrapper>
  )
}

const PostList = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -${M2};
  width: calc(100% + ${M4});

  ${maxWidth(PHONE)} {
    display: block;
  }
`

const Posts = ({ posts }: { posts: IPost[] }) => (
  <Fade distance={M2}>
    <PostList>
      {posts.map((post: IPost) => (
        <Post key={post.frontmatter.slug} {...post} />
      ))}
    </PostList>
  </Fade>
)

export default Posts

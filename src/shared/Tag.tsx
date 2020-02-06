import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { LILAC, INDIGO } from '../constants/colors'
import { BORDER_RADIUS } from '../constants/measurements'

export const Tag = styled.span`
  background: ${LILAC};
  color: ${INDIGO};
  font-weight: 500;
  font-size: 80%;
  border-radius: ${BORDER_RADIUS};
  padding: 2px 6px;
  margin-right: 4px;
  display: inline-block;
  line-height: 1.25;
`

interface ITagsProps {
  tags: string[]
}

export const Tags = ({ tags }: ITagsProps) => {
  if (!tags || !tags.length) return null
  return (
    <span style={{ marginBottom: '-4rem' }}>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </span>
  )
}

interface ILinkedTagsProps {
  tagToUrl: object
}

export const LinkedTags = ({ tagToUrl }: ILinkedTagsProps) => {
  if (!tagToUrl) return null
  return (
    <span style={{ marginBottom: '-4rem' }}>
      {Object.keys(tagToUrl).map((tagText, i) => (
        <Link key={i} to={tagToUrl[tagText]}>
          <Tag>{tagText}</Tag>
        </Link>
      ))}
    </span>
  )
}

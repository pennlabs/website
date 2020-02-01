import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Pagination = ({ pageContext }) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = pageContext

  return (
    <nav role="navigation">
      <span>
        {previousPagePath && (
          <Link to={previousPagePath} rel="prev">
            &larr; Newer Posts
          </Link>
        )}
      </span>{' '}
      {numberOfPages > 1 && (
        <span className="pagination-location">
          Page {humanPageNumber} of {numberOfPages}
        </span>
      )}{' '}
      <span>
        {nextPagePath && (
          <Link to={nextPagePath} rel="next">
            Older Posts &rarr;
          </Link>
        )}
      </span>
    </nav>
  )
}

export default Pagination

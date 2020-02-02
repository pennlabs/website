import React from 'react'
import { Link } from 'gatsby'
import { P } from './Typography'
import { BtnLink, EBtnSize } from './Btn'

const Pagination = ({ pageContext }) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = pageContext

  return (
    <nav role="navigation" style={{ marginTop: '1.45rem' }}>
      {previousPagePath && (
        <BtnLink
          to={previousPagePath}
          rel="prev"
          size={EBtnSize.SM}
          style={{ marginRight: '1rem' }}
        >
          &larr; Previous page
        </BtnLink>
      )}
      {numberOfPages > 1 && (
        <P sm style={{ display: 'inline-block' }}>
          Page {humanPageNumber} of {numberOfPages}
        </P>
      )}
      {nextPagePath && (
        <BtnLink
          to={nextPagePath}
          size={EBtnSize.SM}
          rel="next"
          style={{ marginLeft: '1rem' }}
        >
          Next page &rarr;
        </BtnLink>
      )}
    </nav>
  )
}

export default Pagination

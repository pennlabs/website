import React from 'react'

export const ChevronRight = props => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-chevron-right"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export const LinkChevronRight = props => (
  <ChevronRight
    style={{
      marginTop: '-6px',
      marginLeft: '-4px',
      marginBottom: '-7px',
      marginRight: '-8px',
      transform: 'scale(0.75)',
    }}
  />
)

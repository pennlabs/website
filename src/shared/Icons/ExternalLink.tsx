import React from 'react'

import { IIconProps } from './types'

export const ExternalLinkIcon = (props: IIconProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="prefix__feather prefix__feather-external-link"
    {...props}
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
)

export const LinkExternalLinkIcon = (props: IIconProps) => (
  <ExternalLinkIcon
    style={{
      marginTop: '-6px',
      marginLeft: '-4px',
      marginBottom: '-5.6px',
      marginRight: '-8px',
      transform: 'scale(0.64)',
    }}
    {...props}
  />
)

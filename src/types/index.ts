import React from 'react'
import { GatsbyImageProps } from 'gatsby-image'

// Generic types
export type Subset<T extends U, U> = U

/**
 * Stuff that goes inside of the parent component
 */
export type ReactChildren = React.ReactNode | React.ReactNodeArray

// Data types used throughout the app

export interface IRole {
  name: string
}

export interface IMember {
  student: {
    name: string
    major?: string
    school?: string
  }
  photo?: string
  roles: IRole[]
  url: string
  year_joined?: string
  bio?: string
  github?: string
  graduation_year?: string
  linkedin?: string
  location?: string
  team?: string
  website?: string
  localImage?: {
    childImageSharp: GatsbyImageProps
  }
}

export interface ITeam {
  name: string
  description: string
  children: IMember[]
}

export interface IGhostTag {
  slug: string
  name: string
  description?: string
  feature_image?: string
}

export interface IGhostAuthor {
  slug: string
  name?: string
}

export interface IGhostPost {
  slug: string
  title: string
  excerpt?: string
  feature_image?: string
  localImage?: {
    childImageSharp: GatsbyImageProps
  }
  reading_time?: number
  published_at?: string
  tags?: IGhostTag[]
  authors?: IGhostAuthor[]
  html?: string
  codeinjection_head?: string
  codeinjection_foot?: string
}

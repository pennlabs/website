import React from 'react'

// Generic types
export type Subset<T extends U, U> = U

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
}

export interface ITeam {
  name: string
  description: string
  children: IMember[]
}

export interface IIconProps {
  color?: string
  style?: React.CSSProperties
  sm?: boolean
  md?: boolean
  lg?: boolean
  strokeWidth?: number
}

export interface IRole {
  name: string
}

export interface IMember {
  student: {
    name: string
  }
  photo?: string
  roles: IRole[]
  url: string
  year_joined?: string
}

export interface ITeam {
  name: string
  description: string
  children: IMember[]
}

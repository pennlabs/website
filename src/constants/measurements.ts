export const HEADER_HEIGHT = '72px'
export const HEADER_Z_INDEX = 1000
export const MOBILE_HEADER_HEIGHT = '52px'
export const FOOTER_HEIGHT = '72px'

export const M0 = '0'
export const M1 = '0.4rem'
export const M2 = '0.8rem'
export const M3 = '1.2rem'
export const M4 = '1.6rem'

export const BORDER_RADIUS = '3px'
export const BORDER_RADIUS_LG = '9px'

export const SHORT_ANIMATION_DURATION = 200
export const LONG_ANIMATION_DURATION = 400

type TScreenWidth = string

export const DESKTOP: TScreenWidth = '1248px'
export const TABLET: TScreenWidth = '992px'
export const PHONE: TScreenWidth = '584px'

type TMediaQuery = string

export const minWidth = (w: TScreenWidth): TMediaQuery =>
  `@media screen and (min-width: ${w})`
export const maxWidth = (w: TScreenWidth): TMediaQuery =>
  `@media screen and (max-width: ${w})`

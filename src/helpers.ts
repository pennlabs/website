import { GatsbyImageFluidProps, GatsbyImageProps } from 'gatsby-image'

/**
 * Given the absolute file path to a markdown file, return the path to the
 * markdown file in the website
 *
 * @param abs
 */
export const getPathFromFileAbsolutePath = (abs: string): string =>
  abs.split('/markdown')[1].split('.md')[0]

const semesterSeason = (season: string): string => {
  switch (season) {
    case 'A':
      return 'Spring'
    case 'B':
      return 'Summer'
    case 'C':
      return 'Fall'
    default:
      return 'Unknown'
  }
}

export const semesterToString = (sem: string): string =>
  `${semesterSeason(sem.charAt(sem.length - 1))} ${sem.slice(
    0,
    sem.length - 1,
  )}`

export const getSrc = (photo: { childImageSharp: GatsbyImageFluidProps }) => {
  if (Array.isArray(photo.childImageSharp.fluid)) {
    return photo.childImageSharp.fluid[0].src
  } else {
    return photo.childImageSharp.fluid.src
  }
}

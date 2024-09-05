import { graphql } from 'gatsby'
import { GenericMemberTemplate, IAlumniTemplateProps } from './utils'

const AlumniTemplate = ({ data }: IAlumniTemplateProps) => {
  return GenericMemberTemplate({ data })
}

export const pageQuery = graphql`
  query($pennkey: String!) {
    alumniJson(pennkey: { eq: $pennkey }) {
      bio
      github
      graduation_year
      linkedin
      hometown
      photo
      localImage {
        childImageSharp {
          fluid(maxWidth: 612) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      teamRoles {
        team {
          name
        }
        roles
      }
      name
      major
      school
      website
      semester_joined
      alumnus
    }
  }
`

export default AlumniTemplate

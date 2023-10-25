import { graphql } from 'gatsby'
import { GenericMemberTemplate, IMemberTemplateProps } from './utils'

const MemberTemplate = ({ data }: IMemberTemplateProps) => {
  return GenericMemberTemplate({ data })
}

export const pageQuery = graphql`
  query($pennkey: String!) {
    membersJson(pennkey: { eq: $pennkey }) {
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
      roles
      name
      major
      school
      team
      website
      semester_joined
      alumnus
      posts {
        excerpt
        frontmatter {
          title
          slug
          customExcerpt
          draft
          coverPhoto {
            childImageSharp {
              fluid(maxWidth: 484) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default MemberTemplate

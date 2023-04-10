import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { WideContainer } from '../shared'
import { ITeam } from '../types'
import { AlumniHero } from '../components/Alumni/Hero'
import { Alumni } from '../components/Alumni/Alumni'
import { Sponsors } from '../components/Alumni/Sponsors'

const AlumniPage = ({
    data: {
        allAlumniJson: { nodes: alumni },
    },
}): React.ReactElement => {
    return (
        <Layout>
            <SEO title="Alumni" />
            <WideContainer>
                <AlumniHero />
                <Alumni alumni={alumni} />
                <Sponsors />
            </WideContainer>
        </Layout>
    )
}

export const pageQuery = graphql`
query {
    allAlumniJson {
        nodes {
            id
            name
            roles
            pennkey
            photo
            graduation_year
            semester_joined
            bio
            github
            linkedin
            job
            team
            website
            hometown
            alumnus
            localImage {
                childImageSharp {
                  fluid(maxWidth: 612) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
        }
      }
  }
`

export default AlumniPage

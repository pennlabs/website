import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { IMember } from '../shared/Icons/types'
import { Container, Section, H1, P } from '../shared'

interface IMemberTemplateProps {
  data: {
    member: IMember
  }
}

interface ITableRow {
  label: string
  value?: string | number | boolean
}

const TableRow = ({ label, value }: ITableRow) => {
  if (!value) return null
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const MemberTemplate = ({ data }: IMemberTemplateProps) => {
  const {
    member: {
      bio,
      github,
      graduation_year,
      linkedin,
      location,
      photo,
      roles,
      student: { name, major, school },
      team,
      website,
      year_joined,
    },
  } = data

  const roleNames = roles.map(({ name: roleName }) => roleName)

  return (
    <Layout>
      <SEO title={name} />
      <Container>
        <Section>
          <H1>{name}</H1>
          {photo && <img src={photo} alt={`${name}'s profile picture`} />}
          {bio && <P>{bio}</P>}
          <table>
            <tbody>
              <TableRow label="Team" value={team} />
              <TableRow
                label={roleNames.length === 1 ? 'Role' : 'Roles in Labs'}
                value={roleNames.join(', ')}
              />
              <TableRow label="Graduation year" value={graduation_year} />
            </tbody>
          </table>
        </Section>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    member(id: { eq: $id }) {
      bio
      github
      graduation_year
      linkedin
      location
      photo
      roles {
        name
      }
      student {
        name
        major
        school
      }
      team
      website
      year_joined(formatString: "YYYY")
    }
  }
`

export default MemberTemplate

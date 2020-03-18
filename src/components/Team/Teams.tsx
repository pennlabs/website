import React from 'react'
import { ITeam, IMember } from '../../types'
import { Fade, Section, H2, Row, Col, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { TeamMemberPreview } from './TeamMemberPreview'

interface ITeams {
  teams: ITeam[]
}

const TEAM_LEAD = 'Team Lead'

const leadsFirst = (members: IMember[]): IMember[] => {
  return members.sort((m1, m2): number => {
    const isLead1 = m1.roles.indexOf(TEAM_LEAD) !== -1
    const isLead2 = m2.roles.indexOf(TEAM_LEAD) !== -1
    if (isLead1) {
      return -1
    } else if (isLead2) {
      return 1
    } else {
      return m1.name.localeCompare(m2.name)
    }
  })
}

export const Teams = ({ teams }: ITeams) => (
  <>
    {teams.map(({ name, description, members }: ITeam) => (
      <Fade key={name} distance="1rem">
        <Section>
          <H2 mb2>{name}</H2>
          <Row>
            <Col sm={12} md={10} lg={8}>
              <P mb4>{description}</P>
            </Col>
          </Row>

          <Row margin={M2}>
            {leadsFirst(members).map((props: IMember) => (
              <TeamMemberPreview key={props.pennkey} {...props} />
            ))}
          </Row>
        </Section>
      </Fade>
    ))}
  </>
)

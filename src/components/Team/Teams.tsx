import React from 'react'
import { ITeam, IMember, ITeamMember } from '../../types'
import { Fade, Section, H2, Row, Col, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { TeamMemberPreview } from './TeamMemberPreview'

interface ITeams {
  teams: ITeam[]
}

const TEAM_LEAD = 'Team Lead'

const leadsFirst = (members: ITeamMember[]): ITeamMember[] => {
  if (!members) return []

  return members.sort((m1, m2): number => {
    const isLead1 = m1.roles.indexOf(TEAM_LEAD) !== -1
    const isLead2 = m2.roles.indexOf(TEAM_LEAD) !== -1
    if (isLead1 === isLead2) {
      return m1.name.localeCompare(m2.name)
    } else if (isLead1) {
      return -1
    } else {
      return 1
    }
  })
}

export const Teams = ({ teams }: ITeams) => (
  <>
    {teams.map(({ name, description, members }: ITeam) => (
      <Fade key={name} distance="1rem">
        <Section style={{width: '100%'}}>
          <H2 mb2>{name}</H2>
          <Row>
            <Col sm={12} md={10} lg={8}>
              <P mb4>{description}</P>
            </Col>
          </Row>

          <Row margin={M2}>
            {leadsFirst(members).map((props: ITeamMember) => (
              <TeamMemberPreview key={props.pennkey} {...props} />
            ))}
          </Row>
        </Section>
      </Fade>
    ))}
  </>
)

import React from 'react'
import { ITeam, IMember } from '../../types'
import { Fade, Section, H2, Row, Col, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { TeamMemberPreview } from './TeamMemberPreview'

interface ITeams {
  teams: ITeam[]
}

export const Teams = ({ teams }: ITeams) => (
  <>
    {teams.map(({ name, description, children: members }: ITeam) => (
      <Fade key={name} distance="1rem">
        <Section>
          <H2 mb2>{name}</H2>
          <Row>
            <Col sm={12} md={10} lg={8}>
              <P mb4>{description}</P>
            </Col>
          </Row>

          <Row margin={M2}>
            {members.map((props: IMember) => (
              <TeamMemberPreview key={props.url} {...props} />
            ))}
          </Row>
        </Section>
      </Fade>
    ))}
  </>
)

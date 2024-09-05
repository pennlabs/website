import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { semesterToString } from '../../helpers'

import { Col, P, Tags } from '../../shared'
import {
  M2,
  BORDER_RADIUS,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
  M3,
} from '../../constants/measurements'
import { TEAM_MEMBER_ROUTE } from '../../constants/routes'
import { BLACK_ALPHA } from '../../constants/colors'
import { ITeamMember } from '../../types'

const StyledLink = styled(Link) <{}>`
  width: calc(100% + ${M2} + ${M2});
  padding: ${M2};
  border-radius: ${BORDER_RADIUS_LG};
  display: block;
  box-shadow: 0 0 0 ${BLACK_ALPHA(0.25)};
  transition: box-shadow ${SHORT_ANIMATION_DURATION}ms ease;
  margin: 0 -${M2} 1.45rem -${M2};

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 1px 12px ${BLACK_ALPHA(0.25)};
  }
`

const Image = styled(BackgroundImage)`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding-top: 100%;
  margin-bottom: ${M2};
  border-radius: ${BORDER_RADIUS};
`

export const TeamMemberPreview = ({ name, roles, pennkey, localImage, semester_joined}: ITeamMember): React.ReactElement => {
  return (
  <Col margin={M2} sm={12} md={6} lg={3} key={pennkey}>
    <StyledLink to={TEAM_MEMBER_ROUTE(pennkey)}>
      {
        localImage?.childImageSharp.fluid && <Image fluid={localImage.childImageSharp.fluid} />
      }
      <P mb1 lg>
        <strong>{name}</strong>
      </P>
      <div style={{ marginBottom: M3 }}>
        <Tags tags={roles} />
      </div>
      {semester_joined && (
        <P mb0 sm>
          Member since {semesterToString(semester_joined)}
        </P>
      )}
    </StyledLink>
  </Col>
  )
}

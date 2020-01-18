import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Col, P, Tags } from '../../shared'
import {
  M2,
  BORDER_RADIUS,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
  M4,
  M3,
} from '../../constants/measurements'
import { TEAM_MEMBER_ROUTE } from '../../constants/routes'
import { BLACK_ALPHA } from '../../constants/colors'
import { IMember } from '../../shared/Icons/types'

const StyledLink = styled(Link)<{}>`
  margin: -${M2};
  padding: ${M2};
  border-radius: ${BORDER_RADIUS_LG};
  display: block;
  box-shadow: 0 0 0 ${BLACK_ALPHA(0.25)};
  transition: box-shadow ${SHORT_ANIMATION_DURATION}ms ease;
  margin-bottom: 1.45rem;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 1px 12px ${BLACK_ALPHA(0.25)};
  }
`

const Image = styled.div<{ src: string }>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.src});
  width: 100%;
  height: auto;
  padding-top: 100%;
  margin-bottom: 1.45rem;
  border-radius: ${BORDER_RADIUS};
`

export const TeamMemberPreview = ({
  student: { name },
  roles,
  url,
  photo,
  year_joined: yearJoined,
}: IMember) => (
  <Col margin={M2} sm={12} md={6} lg={3} key={url}>
    <StyledLink to={TEAM_MEMBER_ROUTE(url)}>
      {photo && <Image src={photo} style={{ marginBottom: M2 }} />}
      <P mb1 lg>
        <strong>{name}</strong>
      </P>
      <div style={{ marginBottom: M3 }}>
        <Tags tags={roles.map(({ name: roleName }) => roleName)} />
      </div>
      {yearJoined && (
        <P mb0 sm>
          Member since {yearJoined}
        </P>
      )}
    </StyledLink>
  </Col>
)

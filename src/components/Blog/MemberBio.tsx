import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../Layout'
import SEO from '../SEO'
import Byline from './Byline'
import { IMember, IGhostPost } from '../../types'
import { TEAM_MEMBER_ROUTE } from '../../constants/routes'

import {
  Section,
  H1,
  MediumContainer,
  Card,
  VFlex,
  Flex,
  P,
} from '../../shared'
import { BORDER_RADIUS_LG, minWidth, PHONE } from '../../constants/measurements'

const Thumbnail = styled.img`
  max-height: 4rem;
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 0;
  min-height: 10rem;
  margin-left: 1em;

  ${minWidth('0px')} {
    min-height: 5rem;
  }

  ${minWidth(PHONE)} {
    min-height: 10rem;
  }
`

const CenteredFlex = styled(Flex)`
  align-items: center;
`

interface IMemberBioProps {
  author: IMember
}

const Bio = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-bottom: 0.5rem;
  & > p {
    margin-bottom: 0;
  }
`

const MemberBio = ({
  author: {
    url,
    photo = '',
    bio = '',
    student: { name },
  },
}: IMemberBioProps): React.ReactElement => (
  <Card bordered>
    <CenteredFlex>
      <div>
        <P>{name}</P>
        <Bio dangerouslySetInnerHTML={{ __html: bio }} />
        <P sm>
          <Link to={TEAM_MEMBER_ROUTE(url)}>Learn More</Link>
        </P>
      </div>
      <Thumbnail src={photo} />
    </CenteredFlex>
  </Card>
)

export default MemberBio

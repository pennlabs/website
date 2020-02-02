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
  H4,
  LinkChevronRightIcon,
  Fade,
} from '../../shared'
import {
  BORDER_RADIUS_LG,
  minWidth,
  PHONE,
  M1,
} from '../../constants/measurements'

const Thumbnail = styled.img`
  min-height: 4rem;
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 0;
  max-height: 10rem;
  margin-right: 1em;

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
  font-size: 80%;
  line-height: 1.375;
`

const MemberBio = ({
  author: {
    url,
    photo = '',
    bio = '',
    student: { name },
  },
}: IMemberBioProps): React.ReactElement => (
  <Fade distance={M1}>
    <Card shaded>
      <CenteredFlex>
        <Thumbnail src={photo} />
        <div>
          <H4>{name}</H4>
          <Bio dangerouslySetInnerHTML={{ __html: bio }} />

          <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
            <Link to={TEAM_MEMBER_ROUTE(url)}>
              Learn more <LinkChevronRightIcon />
            </Link>
          </div>
        </div>
      </CenteredFlex>
    </Card>
  </Fade>
)

export default MemberBio

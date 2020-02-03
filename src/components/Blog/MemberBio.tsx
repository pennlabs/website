import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { IMember } from '../../types'
import { TEAM_MEMBER_ROUTE } from '../../constants/routes'

import { Card, Flex, H4, LinkChevronRightIcon, Fade } from '../../shared'
import {
  BORDER_RADIUS_LG,
  minWidth,
  PHONE,
  M1,
  maxWidth,
  M2,
} from '../../constants/measurements'

const Thumbnail = styled.img`
  min-height: 4rem;
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 0;
  max-height: 10rem;
  margin-right: 1rem;

  ${minWidth(PHONE)} {
    min-height: 10rem;
  }

  ${maxWidth(PHONE)} {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    min-height: 0;
    max-height: none;
  }

  ${maxWidth('400px')} {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: ${M2};
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

  p {
    margin-bottom: ${M2};
  }
`

const StyledCenteredFlex = styled(CenteredFlex)`
  ${maxWidth(PHONE)} {
    align-items: start;
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
  <Fade distance={M1}>
    <Card shaded>
      <StyledCenteredFlex>
        <Thumbnail src={photo} />
        <div>
          <H4 mb2>{name}</H4>
          <Bio dangerouslySetInnerHTML={{ __html: bio }} />

          <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
            <Link to={TEAM_MEMBER_ROUTE(url)}>
              Learn more <LinkChevronRightIcon />
            </Link>
          </div>
        </div>
      </StyledCenteredFlex>
    </Card>
  </Fade>
)

export default MemberBio

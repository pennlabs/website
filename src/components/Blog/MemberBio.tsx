import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import remark from 'remark'
import html from 'remark-html'
import { useState } from 'react'

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

const markdownProcessor = remark().use(html)

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
  author: { pennkey, localImage, bio = '', name },
}: IMemberBioProps): React.ReactElement => {

  // Bios may contain markdown. Make sure to parse these into HTML!
  const [bioAsHtml, updateBioAsHtml] = useState(bio)
  markdownProcessor
    .process(bio || '')
    .then(({ contents: b }) => updateBioAsHtml(b))

  return (
    <Fade distance={M1}>
      <Card shaded>
        <StyledCenteredFlex>
          <Thumbnail src={localImage.childImageSharp.fluid.src} />
          <div>
            <H4 mb2>{name}</H4>
            <Bio dangerouslySetInnerHTML={{ __html: bioAsHtml }} />

            <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
              <Link to={TEAM_MEMBER_ROUTE(pennkey)}>
                Learn more <LinkChevronRightIcon />
              </Link>
            </div>
          </div>
        </StyledCenteredFlex>
      </Card>
    </Fade>
  )
}

export default MemberBio

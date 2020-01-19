import React from 'react'
import styled from 'styled-components'

import { Container, Section, H2, P, Row, Col, Card, BtnAnchor, LinkExternalLink } from '../../shared'
import { M2 } from '../../constants/measurements'
import { INFO_SESSIONS_EVENT_ROUTE } from '../../constants/routes'
import { WHITE, PURPLE_DEEP, PURPLE_DARK } from '../../constants/colors'
import { INTER } from '../../constants/fonts'

const StyledSection = styled(Section)`
  display: block;
  background-image: linear-gradient(to bottom right, ${PURPLE_DARK}, ${PURPLE_DEEP}); 
  width: 100%;
`

const StyledP = styled(P)`
  font-family: INTER;
  color: ${WHITE};
`



export const InfoSessions = () => (
  <StyledSection>
    <Container>
      <H2 style={{ marginBottom: '0.5rem', color: 'WHITE' }}>Info Sessions</H2>    
      <StyledP>Learn more about life in Penn Labs</StyledP> 
      <StyledP>Come meet our members and treat yourself to some Insomnia Cookies!</StyledP>
      <Row style={{ width: '60%' }}>
        <Col margin={M2}>
          <Card shaded style={{ textAlign: 'center' }}>
            <P style={{ marginBottom: 'none' }}>Thursday 1/23, 6-7pm
            <br/>JMHH 250
            </P>
          </Card> 
        </Col>
        <Col margin={M2}>
          <Card shaded>
            <P>Monday 1/27, 6-7pm
            <br/>JMHH 250
            </P>
          </Card> 
        </Col>
      </Row>

      {INFO_SESSIONS_EVENT_ROUTE && (
        <BtnAnchor href={INFO_SESSIONS_EVENT_ROUTE} target="_BLANK">
          View on Facebook <LinkExternalLink />
        </BtnAnchor>
      )}
    </Container>
  </StyledSection>
)

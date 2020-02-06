import React from 'react'
import styled from 'styled-components'

import {
  Container,
  Section,
  H2,
  H3,
  P,
  Row,
  Col,
  Card,
  BtnAnchor,
  LinkExternalLinkIcon,
} from '../../shared'
import { M2 } from '../../constants/measurements'
import { INFO_SESSIONS_EVENT_ROUTE } from '../../constants/routes'
import { WHITE, PURPLE_DEEP, PURPLE_DARK } from '../../constants/colors'

export const InfoSessions = () => (
  <Section>
    <H2>Info Sessions</H2>
    <H3 normal>Learn more about life in Penn Labs</H3>
    <P>Come meet our members and treat yourself to some Insomnia Cookies!</P>
    <Row margin={M2}>
      <Col margin={M2} sm={12} md={6} lg={4}>
        <Card shaded>
          <P mb0>
            Thursday 1/23, 6-7pm
            <br />
            JMHH 250
          </P>
        </Card>
      </Col>
      <Col margin={M2} sm={12} md={6} lg={4}>
        <Card shaded>
          <P mb0>
            Monday 1/27, 6-7pm
            <br />
            JMHH 250
          </P>
        </Card>
      </Col>
    </Row>

    {INFO_SESSIONS_EVENT_ROUTE && (
      <BtnAnchor href={INFO_SESSIONS_EVENT_ROUTE} target="_BLANK">
        View on Facebook <LinkExternalLinkIcon />
      </BtnAnchor>
    )}
  </Section>
)

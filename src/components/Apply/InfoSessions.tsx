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
    <P>Come meet our members and learn more about what we do!</P>
    <Row margin={M2}>
      <Col margin={M2} sm={12} md={6} lg={4}>
        <Card shaded>
          <P mb0>
            Friday 9/3, 5pm-6pm EST
            <br />
            <a href="https://upenn.zoom.us/j/93340915772?pwd=Q1F3d3NWUXBLK0pBcHRTeXRnQzdxZz09">Zoom Link</a>
          </P>
        </Card>
      </Col>
      <Col margin={M2} sm={12} md={6} lg={4}>
        <Card shaded>
          <P mb0>
            Sunday 9/5, 12pm-1pm EST
            <br />
            <a href="https://upenn.zoom.us/j/99503873045?pwd=TWt3NDNVNHE4aXhFRkJRRStLRXNuZz09">Zoom Link</a>
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

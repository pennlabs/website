import React from 'react'
import styled from 'styled-components'

import { Section, Container, H1, H3, BtnAnchor, LinkExternalLink } from '../../shared'
import { APPLY_FORM_ROUTE } from '../../constants/routes'

export const Hero = () => (
  <Section>
    <Container>
      <H1>Come build with us</H1>
      <H3 style={{ fontWeight: 400 }}>
        Join the Penn Labs community this Spring.
      </H3>
      {APPLY_FORM_ROUTE && (
        <BtnAnchor href={APPLY_FORM_ROUTE} target="_BLANK">
          Apply Now <LinkExternalLink />
        </BtnAnchor>
      )}
    </Container> 
  </Section>
)

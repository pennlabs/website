import React from 'react'

import {
  Section,
  Container,
  H1,
  H3,
  BtnAnchor,
  LinkExternalLinkIcon,
} from '../../shared'
import { APPLY_FORM_ROUTE } from '../../constants/routes'

export const Hero = () => (
  <Section>
    <Container>
      <H1>Come build with us</H1>
      <H3 normal>Join the Penn Labs community this Spring.</H3>
      {APPLY_FORM_ROUTE && (
        <BtnAnchor href={APPLY_FORM_ROUTE} target="_BLANK">
          Apply Now <LinkExternalLinkIcon />
        </BtnAnchor>
      )}
    </Container>
  </Section>
)

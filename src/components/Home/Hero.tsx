import React from 'react'

import { H1, P, Container, Section } from '../../shared'

export const Hero = (): React.ReactElement => (
  <Section>
    <Container>
      <H1>Built for students, by students</H1>
      <P>
        We're connecting students, resources, and data to improve life at Penn.
      </P>
    </Container>
  </Section>
)

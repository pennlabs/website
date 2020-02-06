import React from 'react'
import { Section, Container, H2, H3, P, Fade } from '../../shared'
import { PINK } from '../../constants/colors'
import { CONTACT_ROUTE } from '../../constants/routes'
import { M1 } from '../../constants/measurements'

export const WhyLabs = () => (
  <Fade distance={M1}>
    <Section>
      <H2>Why Penn Labs?</H2>
      <H3 normal>
        Because we <span style={{ color: PINK }}>&hearts;</span> creators
      </H3>
      <P>
        If you love to build real products to help real people, this is the
        group for you. All Penn students are eligible to apply for any open
        position, regardless of their major or year.
      </P>
      <P>
        Our mission is to build tech products to serve all Penn students, a goal
        which requires a both commitment and technical experience. Each week, we
        meet for 4 hours to work on projects, discuss future product roadmaps,
        and learn more about the technologies we use. Members are also expected
        to work outside of meetings to meet product goals. While technical
        ability varies when joining Penn Labs and our members are always
        learning, our commitment to building quality products means that we seek
        candidates with sufficient technical ability, which we evaluate through
        the technical challenge phase of the application process.
      </P>
      <P>
        Come out to our info sessions to learn more and meet our members! And
        feel free to reach out to{' '}
        <a href={CONTACT_ROUTE}>contact@pennlabs.org</a> anytime.
      </P>
    </Section>
  </Fade>
)

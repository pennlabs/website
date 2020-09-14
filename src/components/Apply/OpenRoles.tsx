import React from 'react'
import { Section, Container, H2, Row, Col, Card, H3, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { STACK_ROUTE } from '../../constants/routes'
import { LABS_BLUE_ALPHA, LABS_BLUE_DARK } from '../../constants/colors'

export const OpenRoles = () => (
  <Section>
    <H2>Open Roles</H2>

    <Card
      style={{ backgroundColor: LABS_BLUE_ALPHA(0.125), color: LABS_BLUE_DARK }}
    >
      <strong>Note:</strong> applications are currently closed. We generally
      accept new members at the start of both the Fall and Spring semesters. If
      you have a request, contact us via the feedback form in the bottom right
      of the screen.
    </Card>

    <Row margin={M2}>
      <Col margin={M2}>
        <Card shaded bordered>
          <H3>Software Engineering</H3>
          <P>
            Build products and implement new features to solve problems with
            tech. Whether you’re interested in front-end web dev, iOS
            programming, or data science, there’s a project that you’ll find
            interesting.
          </P>
          <P>
            While many of our developers have multiple interests and
            responsibilities, here are the categories that we find useful to get
            to know you by:
          </P>
          <ul>
            <li>Backend web</li>
            <li>Frontend web</li>
            <li>DevOps</li>
            <li>Full Stack web</li>
            <li>Android</li>
            <li>iOS</li>
          </ul>
          <P>
            <a href={STACK_ROUTE}>Check out our stack</a> to find out more about
            the frameworks and tools we use in our products.
          </P>
        </Card>
      </Col>
      <Col margin={M2}>
        <Card shaded bordered>
          <H3>Product Design</H3>
          <P>
            Connect function with form to reach users and meet their needs
            through UI/UX and graphic design. Designers create low to
            high-fidelity mockups, prototypes, and graphic assets. They also
            manage the visual language of the organization. Our toolkit includes
            Sketch, Figma, Zeplin, and Adobe Suite.
          </P>
        </Card>

        <Card shaded bordered>
          <H3>Business Development</H3>
          <P>
            Our products need to be taken from "lab" to real world. BizDev
            spearheads marketing, events, and collaborations to ensure that Penn
            Labs reaches real users and meets their needs. If you want to be in
            the tech industry and help grow an organization in all capacities
            (strategy, user acquisition, finance, etc), this is the role for
            you.
          </P>
        </Card>
      </Col>
    </Row>
  </Section>
)

import React from 'react'
import { Section, H2, Row, Col, Card, H3, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { STACK_ROUTE } from '../../constants/routes'

export const OpenRoles = () => (
  <Section>
    <H2>Open Roles</H2>

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
            <li>Back-end web</li>
            <li>Front-end web</li>
            <li>DevOps</li>
            <li>Fullstack web</li>
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
            through UI/UX and graphic design. Designers create mockups,
            prototypes, and graphic assets. They also manage the visual language
            of the organization. Our toolkit includes Sketch, Invision, Zeplin,
            and Adobe Suite.
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

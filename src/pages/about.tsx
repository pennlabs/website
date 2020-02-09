import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { AboutHero } from '../components/About/Hero'
import { Section, Container, Row, Col, P, H2, H3, Img } from '../shared'
import { M2 } from '../constants/measurements'

const highfivePath = require('../images/about/high-five.gif') as string // tslint:disable-line
const peoplelogoPath = require('../images/about/people-labs-logo.gif') as string // tslint:disable-line
const speechbubblePath = require('../images/about/speech-bubbles.gif') as string // tslint:disable-line

const AboutPage = (): React.ReactElement => (
  <Layout>
    <SEO title="About" />

    <Container>
      <AboutHero />

      <Section>
        <Row margin={M2}>
          <Col sm={8} offsetSm={2} lg={5} offsetLg={0} margin={M2}>
            <Img src={highfivePath} alt="High five" />
          </Col>
          <Col sm={12} lg={7} margin={M2}>
            <H2>Founding</H2>
            <H3 normal>Humble beginnings at a hackathon</H3>
            <P>
              In 2011, we got our start at Penn’s student-run hackathon,
              PennApps. A small team was working on what’s now called Penn
              Course Review. Although Penn had been releasing semesterly
              professor and course reviews for decades, the team at PennApps
              wanted to build a user-friendly website. They envisioned a
              database that would serve as a the most trusted source of
              crowd-sourced academic information at Penn.
            </P>
            <P>
              After the hackathon was over, the team that made Penn Course
              Review was turned into PennApps Labs to continue maintaining the
              platform. It was also tasked with a bigger goal: look for more
              ways to use technology to improve life at Penn.
            </P>
          </Col>
        </Row>
      </Section>

      <Section>
        <Row margin={M2}>
          <Col
            sm={8}
            offsetSm={2}
            md={6}
            offsetMd={3}
            lg={5}
            offsetLg={7}
            margin={M2}
          >
            <Img src={peoplelogoPath} alt="People and Labs logo" />
          </Col>
          <Col sm={12} md={12} lg={7} offsetLg={-12} margin={M2}>
            <H2>Growing Our Reach</H2>
            <H3 normal>University support for our mission</H3>
            <P>
              So, we hit the ground running. We believe that when it comes to
              improving life for students, students themselves are the
              best-equipped to engage with users and provide meaningful
              solutions. With our core value of improving student life, we built
              a track record of creating real products with real impact. Soon,
              we established ourselves as Penn Labs and became affiliated with
              the Undergraduate Assembly. This brought us into campus-wide
              conversations about addressing student needs. It also gave us a
              seat at the table with university administrators.
            </P>
            <P>
              Penn’s support is incredibly humbling and means a lot to us. This
              support comes in many forms, including financing, data, and access
              to Penn’s technology infrastructure. With it, we’ve invested in
              cultivating a startup-like environment to build reliable, high
              quality products and uphold industry standards in engineering and
              education.
            </P>
          </Col>
        </Row>
      </Section>

      <Section>
        <Row margin={M2}>
          <Col
            offsetSm={2}
            sm={8}
            md={6}
            offsetMd={3}
            lg={5}
            offsetLg={0}
            margin={M2}
          >
            <Img src={speechbubblePath} alt="People talking" />
          </Col>
          <Col sm={12} lg={7} margin={M2}>
            <H2>Penn Labs Today</H2>
            <H3 normal>
              For academics, campus life, and everything in-between
            </H3>
            <P>
              We believe that Penn Labs is an organization like no other. We run
              like a startup and grow as a family. We’re connected through the
              challenging and impactful nature of our work. We’re students
              first, and we believe in learning by doing—together.
            </P>
            <P>
              Innovation in technology has made a lot of what we do possible.
              Over the years, the horizon grows ever broader and barriers to
              entry diminish. We can’t wait to see where this road takes us, as
              we continue working toward our mission for many more years to
              come. We hope that we’re making Penn better for you.
            </P>
          </Col>
        </Row>
      </Section>
    </Container>
  </Layout>
)

export default AboutPage

import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { AboutHero } from '../components/About/Hero'
import { H1, Section, Container, P, H3, H4 } from '../shared'

const imgPath1 = require('../images/about/high-five.gif') as string // tslint:disable-line
const imgPath2 = require('../images/about/speech-bubbles.gif') as string // tslint:disable-line

const AboutPage = (): React.ReactElement => (
  <Layout>
    <SEO title="About" />

    <Container>
      <AboutHero />

      <Section>
        <H3>Founding</H3>
        <H4 normal>Humble beginnings at a hackathon</H4>
        <P>
          In 2011, we got our start at Penn’s student-run hackathon, PennApps. A
          small team was working on what’s now called Penn Course Review.
          Although Penn had been releasing semesterly professor and course
          reviews for decades, the team at PennApps wanted to build a
          user-friendly website. They envisioned a database that would serve as
          a the most trusted source of crowd-sourced academic information at
          Penn.
        </P>
        <P>
          After the hackathon was over, the team that made Penn Course Review
          was turned into PennApps Labs to continue maintaining the platform. It
          was also tasked with a bigger goal: look for more ways to use
          technology to improve life at Penn.
        </P>
        <img src={imgPath1} alt="High five" />
      </Section>

      <Section>
        <H3>Growing Our Reach</H3>
        <H4 normal>University support for our mission</H4>
        <P>
          So we hit the ground running. We believe that when it comes to
          improving life for students, students themselves are the best-equipped
          to engage with users and provide meaningful solutions. With our core
          value of improving student life and track record of creating real
          products, we soon became affiliated with the Undergraduate Assembly
          (UA). This brought us into campus-wide conversations about addressing
          student needs. It also gave us a seat at the table with university
          administrators. (Oh yeah, somewhere along the line we established
          ourselves as Penn Labs.)
        </P>
        <P>
          Penn’s support is incredibly humbling and means a lot to us. This
          support comes in many forms, including financing, data, and access to
          Penn’s technology infrastructure. Each year, we request our budget
          from the UA alongside other student governance groups. The Office of
          the Provost provides joint funding by matching the UA allocation. Both
          groups are represented on our Advisory Board, which is comprised of
          representatives from the following:
        </P>
        <ul>
          <li>Information Services and Computing</li>
          <li>Office of the Provost</li>
          <li>Office of the Registrar</li>
          <li>Office of Student Affairs</li>
          <li>Undergraduate Assembly</li>
        </ul>
        <P>
          Our funding gives us access to the industry standards for technology
          infrastructure and applications. We’ve invested in cultivating a
          startup-like environment to continue building high quality products
          and providing growth opportunities to members.
        </P>
      </Section>

      <Section>
        <H3>Today</H3>
        <H4 normal>For academics, campus life, and everything in-between</H4>
        <P>
          Yes, we’re biased, but we believe that Penn Labs is an organization
          like no other. We run like a startup and grow as a family. We’re
          connected through the challenging and impactful nature of our work.
          We’re students first, and we believe in learning by doing—together.
        </P>
        <P>
          Innovation in technology has made a lot of what we do possible. Over
          the years, the horizon grows ever broader and barriers to entry
          diminish. We can’t wait to see where this road takes us, and we’ll be
          working on our mission for many more years to come. We hope that we’re
          making Penn better for you.
        </P>
      </Section>
    </Container>
  </Layout>
)

export default AboutPage

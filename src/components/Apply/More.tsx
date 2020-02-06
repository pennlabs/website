import React from 'react'
import { Section, Container, H2, H3, P, Row, Col, Card } from '../../shared'
import { M1 } from '../../constants/measurements'

interface IMore {
  title: string
  content: string
}

const more: IMore[] = [
  {
    title: 'Iconic Products',
    content:
      'From Penn Course Review to the Common Funding Application, we build software that improves the lives of every Penn student. Watching your friends use the products that you helped build is incredibly rewarding way to make an impact at Penn.',
  },
  {
    title: 'Hone Your Skills',
    content:
      "Building and maintaining production-quality products used by thousands of students every day is great real-world experience that's hard to get anywhere else on campus. Our members are highly sought-after, becoming teaching assistants, working for prestigious companies around the world, and launching their own startups.",
  },
  {
    title: 'Modern Engineering',
    content:
      'We use exclusively open source modern frameworks that are commonly used in the software industry (like React, Django, Swift, and Kotlin). Our engineers keep up to date with good coding/deployment practices and we always place an emphasis on becoming better programmers.',
  },
  {
    title: 'Lots of Fun',
    content:
      "We're proud of the community we've built inside Penn Labs. Outside of working on all our products, we're a group of friends who support each other. We have a co-ed rec basketball team (2018-19 champions!), board game nights, study sessions, and also just hang out. It's always great to get away with friends to avoid thinking about bugs for a while.",
  },
]

export const More = () => (
  <Section>
    <H2>More About Us</H2>
    <Row margin={M1}>
      {more.map(({ title, content }) => (
        <Col key={title} margin={M1} sm={12} md={6} lg={6} flex>
          <Card shaded bordered>
            <H3>{title}</H3>
            <P mb0>{content}</P>
          </Card>
        </Col>
      ))}
    </Row>
  </Section>
)

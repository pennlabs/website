import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, H1, P, Section, LinkChevronRightIcon } from '../shared'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../constants/routes'

const buttonPath = require('../images/button.svg') as string // tslint:disable-line

const Image = styled.img`
  display: inline-block;
  width: 50%;
  max-width: 18rem;
  height: auto;
`

const NotFoundPage = (): React.ReactElement => (
  <Layout>
    <Section>
      <Container style={{ textAlign: 'center' }}>
        <SEO title="404: Not found" />
        <Image src={buttonPath} alt="Broken penn button" />
        <H1 mb2>Not Found</H1>
        <P>The page you were looking for does not exist.</P>
        <Link to={HOME_ROUTE}>
          Back to home <LinkChevronRightIcon />
        </Link>
      </Container>
    </Section>
  </Layout>
)

export default NotFoundPage

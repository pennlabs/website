import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  H1,
  Section,
  Container,
  P,
  H3,
  BtnAnchor,
  LinkExternalLink,
  EBtnSize,
  Card,
  Tags,
} from '../shared'
import { M2, M3 } from '../constants/measurements'

// TODO images

interface IResource {
  name: string
  demoLink: string
  docsLink: string
  tags: string[]
  // imagePath: string
}

const resources = [
  {
    name: 'Penn SDK',
    demoLink: 'https://data.pennlabs.org',
    docsLink: 'https://penn-sdk.readthedocs.io/en/latest/',
    tags: ['Python', 'SDK'],
  },
  {
    name: 'Penn Mobile',
    demoLink: 'https://data.pennlabs.org',
    docsLink: 'https://github.com/pennlabs/labs-api-server',
    tags: ['JSON', 'REST API'],
  },
  {
    name: 'Penn Course Review',
    demoLink: 'https://data.pennlabs.org',
    docsLink: 'https://github.com/pennlabs/pcr/blob/master/docs/api.md',
    tags: ['JSON', 'REST API'],
  },
]

// TODO proper tags

const ResourcesPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Resources" />
    <Container>
      <Section>
        <H1 mb1>Resources</H1>
        <H3 style={{ fontWeight: 400 }}>
          Tutorials and data for building your own products
        </H3>

        <P>
          We're dedicated to giving back to the community—here are some guides
          and tutorials we've written to help everybody build products like
          ours. We also maintain free APIs and SDKs with support for Javascript,
          Python, Ruby and OAuth.
        </P>
      </Section>
      <Section>
        {resources.map(({ name, demoLink, docsLink, tags }) => (
          <Card key={name} shaded hoverable bordered>
            <H3 mb1>{name}</H3>
            <div style={{ marginBottom: M3 }}>
              <Tags tags={tags} />
            </div>
            <div>
              <BtnAnchor
                style={{ marginRight: M2, marginBottom: 0 }}
                size={EBtnSize.SM}
                href={docsLink}
                target="_BLANK"
              >
                Docs <LinkExternalLink />
              </BtnAnchor>
              <a
                href={demoLink}
                target="_BLANK"
                style={{ marginBottom: 0, fontSize: '80%' }}
              >
                Demo <LinkExternalLink />
              </a>
            </div>
          </Card>
        ))}
      </Section>
    </Container>
  </Layout>
)

export default ResourcesPage

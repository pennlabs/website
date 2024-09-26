import React from 'react'
import { ResourcesHero } from './Hero'
import { IResource } from './types'
import { Resource } from './Resource'
import { Section, Row, Fade } from '../../shared'
import { M1 } from '../../constants/measurements'

const pcpLogoPath = require('../../images/resources/pcp-logo.svg') as string // tslint:disable-line
const pcrLogoPath = require('../../images/resources/pcr-logo.svg') as string // tslint:disable-line
const pennMobileLogoPath = require('../../images/resources/penn-mobile-logo.svg') as string // tslint:disable-line

const resources: IResource[] = [
  {
    name: 'Penn SDK',
    demoLink: 'https://data.pennlabs.org',
    docsLink: 'https://penn-sdk.readthedocs.io/en/latest/',
    tags: ['Python', 'SDK'],
    imagePath: pcpLogoPath,
  },
  {
    name: 'Penn Mobile',
    demoLink: 'https://data.pennlabs.org',
    docsLink: 'https://github.com/pennlabs/labs-api-server',
    tags: ['JSON', 'REST API'],
    imagePath: pennMobileLogoPath,
  },
  {
    name: 'Penn Course Review',
    demoLink: 'https://data.pennlabs.org',
    docsLink: 'https://github.com/pennlabs/pcr/blob/master/docs/api.md',
    tags: ['JSON', 'REST API'],
    imagePath: pcrLogoPath,
  },
]

export const Resources = () => (
  <>
    <ResourcesHero />
    <Section style={{ paddingTop: 0 }}>
      <Fade>
        <Row margin={M1}>
          {resources.map(props => (
            <Resource key={props.name} {...props} />
          ))}
        </Row>
      </Fade>
    </Section>
  </>
)

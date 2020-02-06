import React from 'react'

import { Hero, Img, BtnAnchor, LinkExternalLinkIcon } from '../../shared'
import { APPLY_FORM_ROUTE } from '../../constants/routes'

const applyPath = require('../../images/hero-apply.svg') as string // tslint:disable-line

export const ApplyHero = () => (
  <Hero
    title="Come Build with Us"
    subtitle="Join the Penn Labs community this spring"
    body={
      APPLY_FORM_ROUTE && (
        <BtnAnchor href={APPLY_FORM_ROUTE} target="_BLANK">
          Apply Now <LinkExternalLinkIcon />
        </BtnAnchor>
      )
    }
    Image={<Img src={applyPath} fullWidth mb0 />}
  />
)

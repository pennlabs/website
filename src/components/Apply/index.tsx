import React from 'react'
import { ApplyHero } from './Hero'
import { WhyLabs } from './WhyLabs'
import { InfoSessions } from './InfoSessions'
import { OpenRoles } from './OpenRoles'
import { ApplicationProcess } from './ApplicationProcess'
import { More } from './More'

export const Apply = () => (
  <>
    <ApplyHero />
    <WhyLabs />
    {/* <InfoSessions /> */}
    <OpenRoles />
    <ApplicationProcess />
    <More />
  </>
)

import React from 'react'
import { Section, H2, BtnAnchor, LinkExternalLinkIcon } from '../../shared'
import { INFO_SESSIONS_EVENT_ROUTE } from '../../constants/routes'

export const InfoSessions = () => (
  <Section>
    <H2>Info Sessions</H2>

    <table>
      <tbody>
        <tr>
          <td style={{ width: '3rem' }}>
            <b>
              When
              <br />
              Where
            </b>
          </td>
          <td>
            Thursday 1/23 6-7pm
            <br />
            JMHH 250
          </td>
        </tr>
        <tr>
          <td style={{ width: '3rem' }}>
            <b>
              When
              <br />
              Where
            </b>
          </td>
          <td>
            Monday 1/27 6-7pm
            <br />
            JMHH 250
          </td>
        </tr>
      </tbody>
    </table>
    {INFO_SESSIONS_EVENT_ROUTE && (
      <BtnAnchor href={INFO_SESSIONS_EVENT_ROUTE} target="_BLANK">
        Facebook Event <LinkExternalLinkIcon />
      </BtnAnchor>
    )}
  </Section>
)

import React from 'react'
import { ITeam, IMember } from '../../types'
import { Fade, Section, H2, Row, Col, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { TeamMemberPreview } from '../Team/TeamMemberPreview'

interface IAlumnis {
    alumni: IMember[]
}

export const Alumni = ({ alumni }) => (
    <>
        <Fade distance="1rem">
            <Section>
                <Row margin={M2}>
                    {alumni.map((props: IMember) => (
                        <TeamMemberPreview key={props.pennkey} {...props} alumnus={true} />
                    ))}
                </Row>
            </Section>
        </Fade>
    </>
)

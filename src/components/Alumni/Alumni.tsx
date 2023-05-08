import React, { useState } from 'react'
import Fuse from 'fuse.js'
import { ITeam, IMember } from '../../types'
import { Fade, Section, H2, Row, Col, P } from '../../shared'
import { M2 } from '../../constants/measurements'
import { TeamMemberPreview } from '../Team/TeamMemberPreview'
import { Input } from '../../shared'

interface IAlumnis {
    alumni: IMember[]
}

const TEAM_LEAD = 'Team Lead'
const DIRECTOR = 'Director_Emeritus'

// sorts by directors, then team leads, then name

const leadsFirst = (members: IMember[]): IMember[] => {
    return members.sort((m1, m2): number => {
        const rank1 = m1.roles.indexOf(DIRECTOR) !== -1 ? 0 : m1.roles.indexOf(TEAM_LEAD) !== -1 ? 1 : 2
        const rank2 = m2.roles.indexOf(DIRECTOR) !== -1 ? 0 : m2.roles.indexOf(TEAM_LEAD) !== -1 ? 1 : 2
        if (rank1 !== rank2) {
            return rank1 - rank2
        }
        return m1.name.localeCompare(m2.name)
    })
}

// filter by name
const filterByName = (members: IMember[], name: string): IMember[] => {
    if (name === '') {
        return members
    }
    const options = {
        shouldSort: true,
        threshold: 0.2,
        includeScore: true,
        keys: ['name']
    }
    const fuse = new Fuse(members, options)
    const search = fuse.search(name)
    return search.map((result: any) => result.item)
}

const filter = (members: IMember[], name: string): IMember[] => {
    return filterByName(leadsFirst(members), name)
}

export const Alumni = ({
    alumni,
}: IAlumnis): React.ReactElement => {
    const handleChange = (event: React.FormEvent) => {
    }
    const [input, setInput] = useState('')
    return (
        <>
            <Fade distance="1rem">
                <Section style={{width:'100%'}}>
                <Input name="search" type="text" value={input} required={false} label="Search Alumni" maxLength={50} onChange={e => setInput(String(e.target.value))} />
                    <Row margin={M2}>
                        {filter(alumni, input).map((props: IMember) => (
                            <TeamMemberPreview key={props.pennkey} {...props} alumnus={true} />
                        ))}
                    </Row>
                </Section>
            </Fade>
        </>
    )
}
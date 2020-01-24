import React from 'react'
import styled from 'styled-components'
import { IResource } from './types'
import {
  Col,
  Card,
  H3,
  Tags,
  BtnAnchor,
  EBtnSize,
  LinkExternalLinkIcon,
  Flex,
} from '../../shared'
import { M1, M3, M2 } from '../../constants/measurements'

const Logo = styled.img<{}>`
  height: 1.5rem;
  width: auto;
  margin-bottom: ${M2};
  margin-right: ${M1};
`

export const Resource = ({
  name,
  demoLink,
  docsLink,
  tags,
  imagePath,
}: IResource) => (
  <Col key={name} margin={M1} flex sm={12} md={4}>
    <Card shaded hoverable bordered style={{ width: '100%' }}>
      <Flex>
        <Logo src={imagePath} alt={name} />
        <H3 mb1>{name}</H3>
      </Flex>
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
          Docs <LinkExternalLinkIcon />
        </BtnAnchor>
        <a
          href={demoLink}
          target="_BLANK"
          style={{ marginBottom: 0, fontSize: '80%' }}
        >
          Demo <LinkExternalLinkIcon />
        </a>
      </div>
    </Card>
  </Col>
)

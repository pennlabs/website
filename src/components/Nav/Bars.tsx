import React from 'react'
import s from 'styled-components'

import { minWidth, PHONE } from '../../constants/measurements'
import { DARK_GRAY } from '../../constants/colors'

const Wrapper = s.div<{}>`
  padding: 10px 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0.5rem;

  &:hover {
    opacity: 0.5;
  }

  ${minWidth(PHONE)} {
    display: none;
  }
`

const Bar = s.span<{}>`
  width: 16px;
  height: 2px;
  margin-bottom: 3px;
  display: block;
  background: ${DARK_GRAY};
`

export const Bars = ({ handleClick }): React.ReactElement => (
  <Wrapper onClick={handleClick}>
    <Bar />
    <Bar />
    <Bar />
  </Wrapper>
)

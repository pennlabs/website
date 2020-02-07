import React from 'react'
import s from 'styled-components'

import {
  WHITE,
  LABS_BLUE,
  LABS_BLUE_DEEP,
  OUTLINE,
} from '../../constants/colors'
import { maxWidth, PHONE } from '../../constants/measurements'
import { FEEDBACK_ROUTE } from '../../constants/routes'
import { MessageIcon } from '../../shared'

const DIAMETER = '2.8rem'
const OFFSET = 18

/**
 * Styles push closer to bottom corner on mobile
 */
const FeedbackLink = s.a<{}>`
  display: flex;
  width: ${DIAMETER};
  height: ${DIAMETER};
  border-radius: 3rem;
  background-color: ${LABS_BLUE};
  position: fixed;
  bottom: ${OFFSET}px;
  right: ${OFFSET}px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(25, 89, 130, .4);
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${LABS_BLUE_DEEP};
  }

  ${maxWidth(PHONE)} {
    bottom: ${OFFSET / 2}px;
    right: ${OFFSET / 2}px;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${OUTLINE};
  }
`

export const Feedback = (): JSX.Element => (
  <FeedbackLink
    href={FEEDBACK_ROUTE}
    title="Feedback"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MessageIcon style={{ color: WHITE, transform: 'scale(1.1)' }} />
  </FeedbackLink>
)

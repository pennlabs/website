import styled from 'styled-components'
import {
  M2,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
  LONG_ANIMATION_DURATION,
} from '../constants/measurements'
import { WHITE, BORDER, BLACK_ALPHA } from '../constants/colors'

interface ICardProps {
  bordered?: boolean
  hoverable?: boolean
  shaded?: boolean
  clickable?: boolean
}

export const Card = styled.div<ICardProps>`
  padding: ${M2};
  background: ${WHITE};
  margin-bottom: 1.35rem;
  border-radius: ${BORDER_RADIUS_LG};
  background: ${WHITE};
  box-shadow: 0 0 0 ${BLACK_ALPHA(0)};
  ${props => props.bordered && `border: 1px solid ${BORDER};`}
  ${props => props.shaded && `box-shadow: 0 1px 6px ${BLACK_ALPHA(0.125)};`}
  ${props =>
    props.clickable &&
    `
    cursor: pointer;
    transform: translateY(0);
    transition: all ${LONG_ANIMATION_DURATION}ms ease;

    :hover,
    :active,
    :focus {
      transform: translateY(-2px);
    }
  `}
  ${props =>
    props.hoverable &&
    `
    transition: all ${SHORT_ANIMATION_DURATION}ms ease;

    :hover,
    :active,
    :focus {
      box-shadow: 0 2px 12px ${BLACK_ALPHA(0.25)};
    }
  `}
`

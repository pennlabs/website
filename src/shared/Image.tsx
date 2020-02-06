import styled, { css } from 'styled-components'
import Image from 'gatsby-image'

interface IImg {
  mb0?: boolean
  fullWidth?: boolean
}

export const Img = styled.img<IImg>(
  ({ mb0, fullWidth }) => css`
    ${mb0 && 'margin-bottom: 0;'}
    ${fullWidth && 'width: 100%;'}
  `,
)

import React from 'react'

import { P, Container } from '../shared'

export default (): React.ReactElement => (
  <footer>
    <Container>
      <P>Penn Labs © {new Date().getFullYear()}</P>
    </Container>
  </footer>
)

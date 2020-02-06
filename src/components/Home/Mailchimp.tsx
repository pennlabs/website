import React from 'react'
import { MAILCHIMP_SUBSCRIBE_ROUTE } from '../../constants/routes'
import { ThinContainer, BtnInput, Input, H2, Card, P } from '../../shared'
import { M0 } from '../../constants/measurements'

const MAILCHIMP_FORM_ID = 'mailchimp-subscribe-form'

interface IMailchimpState {
  FNAME: string
  LNAME: string
  EMAIL: string
}

/**
 * NOTE mailchimp requires the names be formatted as such
 */
export class Mailchimp extends React.Component<{}, IMailchimpState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      FNAME: '',
      LNAME: '',
      EMAIL: '',
    }
  }

  private isDisabled() {
    const { EMAIL } = this.state
    return !EMAIL
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const { name, value } = event.target
    const updates = {
      [name]: value,
    } as Pick<IMailchimpState, 'FNAME' | 'LNAME' | 'EMAIL'>
    this.setState(updates)
  }

  public render() {
    const { EMAIL, FNAME, LNAME } = this.state
    const isDisabled = this.isDisabled()
    return (
      <ThinContainer>
        <Card bordered shaded>
          <H2 mb2>Stay in the loop!</H2>
          <P>Get product updates, event invites, and more.</P>
          <form
            id={MAILCHIMP_FORM_ID}
            action={MAILCHIMP_SUBSCRIBE_ROUTE}
            method="post"
            noValidate
            style={{ marginBottom: M0 }}
            target="_blank"
          >
            <div>
              <Input
                label="Email address"
                value={EMAIL}
                type="email"
                name="EMAIL"
                id="email"
                required
                onChange={e =>
                  this.handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </div>

            <div>
              <Input
                label="First name"
                value={FNAME}
                type="text"
                name="FNAME"
                id="firstName"
                required={false}
                onChange={e =>
                  this.handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </div>
            <div>
              <Input
                label="Last name"
                value={LNAME}
                type="text"
                name="LNAME"
                id="lastName"
                required={false}
                onChange={e =>
                  this.handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </div>
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_302f80cd617d63a387d987ef2_712d6085f5"
                tabIndex={-1}
                value=""
                readOnly
              />
            </div>
            <BtnInput
              fullWidth
              marginBottom={M0}
              disabled={isDisabled}
              type="submit"
              value="Subscribe"
              name="subscribe"
            />
          </form>
        </Card>
      </ThinContainer>
    )
  }
}

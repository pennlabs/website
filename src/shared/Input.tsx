import React from 'react'
import s from 'styled-components'
import { BLACK, BORDER, WHITE, OUTLINE, LABS_BLUE } from '../constants/colors'
import { BORDER_RADIUS } from '../constants/measurements'

const Asterisk = () => <span style={{ color: LABS_BLUE }}>*</span>

export interface ILabelProps {
  label?: string
  sm?: boolean
  htmlFor?: string
  style?: React.CSSProperties
  required?: boolean
}

const LabelTag = s.label`
  display: inline-block;
  color: ${BLACK};
  opacity: 0.5;
  font-size: ${({ sm }: ILabelProps) => (sm ? '64%' : '80%')};
  margin-bottom: ${({ sm }: ILabelProps) => (sm ? '0.2rem' : '0.4rem')};
`

export const Label = ({ label, sm, style, htmlFor, required }: ILabelProps) => {
  if (!label) return null
  return (
    <LabelTag sm={sm} style={style} htmlFor={htmlFor}>
      {label} {required && <Asterisk />}
    </LabelTag>
  )
}

const styles = `
  margin-bottom: 1rem !important;
  border-radius: ${BORDER_RADIUS} !important;
  border: 2px solid ${BORDER};
  background: ${WHITE};
  background-clip: padding-box;
  font-size: 1rem !important;
  padding: 0.5rem 0.75rem !important;
  display: block;
  width: 100%;
  line-height: 1.5;
  color: ${BLACK};
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:active,
  &:focus {
    border-color: ${LABS_BLUE} !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${OUTLINE};
  }
`

const InputTag = s.input`
  ${styles}
`

export interface IInputTypeProps {
  autoFocus?: boolean
  label?: string
  style?: React.CSSProperties
  isTextarea?: boolean
  rows?: number
  placeholder?: string
  type: 'text' | 'password' | 'number' | 'email' | 'tel'
  required: boolean
  id?: string
  maxLength?: number
  autoComplete?:
    | 'off'
    | 'on'
    | 'email'
    | 'name'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'given-name'
    | 'family-name'
}

export type IInputProps = IInputTypeProps & IInputStateProps

/**
 * Looks similar to the input tag. User can drag bottom right corner to
 * increase height. Minimum height is set such that user cannot resi
 * @param props
 */
export const TextareaTag = ({ style, ...rest }: IInputProps) => (
  <InputTag
    as="textarea"
    style={{
      resize: 'vertical',
      minHeight: '49px',
      maxHeight: '2000px',
      ...(style || {}),
    }}
    {...rest}
  />
)

export interface IInputStateProps {
  value: string | number
  name: string
  maxLength?: number
  smallLabel?: boolean
  onChange: (event: React.FormEvent) => void
}

export const Input = ({
  label,
  isTextarea,
  rows,
  onChange,
  smallLabel,
  maxLength,
  required,
  ...props
}: IInputProps): React.ReactElement => {
  const handleChange = (event: React.FormEvent) => {
    if (maxLength) {
      const { value } = event.target as HTMLInputElement
      if (value && value.length > maxLength) return
    }

    onChange(event)
  }
  return (
    <>
      <Label
        label={label}
        htmlFor={props.name}
        sm={smallLabel}
        required={required}
      />
      {isTextarea ? (
        <TextareaTag
          onChange={handleChange}
          id={props.name}
          rows={rows || 10}
          required={required}
          {...props}
        />
      ) : (
        <InputTag
          onChange={handleChange}
          id={props.name}
          required={required}
          {...props}
        />
      )}
    </>
  )
}

import React from 'react'
import styled from 'styled-components'
import {variant} from 'styled-system'
import {get} from './constants'
import sx, {SxProp} from './sx'

const variants = variant({
  variants: {
    default: {
      color: 'fg.default',
      backgroundColor: 'accent.subtle',
      borderColor: 'accent.muted',
      svg: {
        color: 'accent.fg',
      },
    },
    success: {
      color: 'fg.default',
      backgroundColor: 'success.subtle',
      borderColor: 'success.muted',
      svg: {
        color: 'success.fg',
      },
    },
    danger: {
      color: 'fg.default',
      backgroundColor: 'danger.subtle',
      borderColor: 'danger.muted',
      svg: {
        color: 'danger.fg',
      },
    },
    warning: {
      color: 'fg.default',
      backgroundColor: 'attention.subtle',
      borderColor: 'attention.muted',
      svg: {
        color: 'attention.fg',
      },
    },
  },
})

type StyledFlashProps = {
  variant?: 'default' | 'warning' | 'success' | 'danger'
  full?: boolean
} & SxProp

const StyledFlash = styled.div<StyledFlashProps>`
  position: relative;
  color: ${get('colors.fg.default')};
  padding: ${get('space.3')};
  border-style: solid;
  border-width: ${props => (props.full ? '1px 0px' : '1px')};
  border-radius: ${props => (props.full ? '0' : get('radii.2'))};
  margin-top: ${props => (props.full ? '-1px' : '0')};

  p:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-right: ${get('space.2')};
  }

  ${variants};
  ${sx};
`

export type FlashProps = StyledFlashProps & React.ComponentPropsWithoutRef<'div'>
const Flash = React.forwardRef<HTMLDivElement, FlashProps>(({variant = 'default', ...rest}, ref) => (
  <StyledFlash ref={ref} variant={variant} {...rest} />
))

Flash.displayName = 'Flash'

export default Flash

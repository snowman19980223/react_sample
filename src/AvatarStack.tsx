import classnames from 'classnames'
import React from 'react'
import styled from 'styled-components'
import {COMMON, get, SystemCommonProps} from './constants'
import {Box} from '.'
import sx, {SxProp} from './sx'
import {ComponentProps} from './utils/types'

type StyledAvatarStackWrapperProps = {
  count?: number
} & SystemCommonProps &
  SxProp

const AvatarStackWrapper = styled.span<StyledAvatarStackWrapperProps>`
  display: flex;
  position: relative;
  height: 20px;
  min-width: ${props => (props.count === 1 ? '20px' : props.count === 2 ? '30px' : '38px')};

  .pc-AvatarItem {
    flex-shrink: 0;
    height: 20px;
    width: 20px;
    box-shadow: 0 0 0 1px ${get('colors.bg.canvas')};
    margin-left: -11px;
    position: relative;
    overflow: hidden;
    transition: margin 0.2s ease-in-out, opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
      box-shadow 0.1s ease-in-out;

    &:first-child {
      margin-left: 0;
    }
    &:nth-child(n + 4) {
      display: none;
    }
  }

  &.pc-AvatarStack--two {
    min-width: 30px;
    .pc-AvatarItem {
      &:nth-child(n + 3) {
        display: none;
      }
    }
  }

  &.pc-AvatarStack--three-plus {
    min-width: 38px;
    .pc-AvatarItem {
      &:nth-child(3) {
        opacity: ${100 - 3 * 15}%;
        margin-left: -17px;
      }
      &:nth-child(4) {
        opacity: ${100 - 4 * 15}%;
        margin-left: -17px;
      }
      &:nth-child(5) {
        opacity: ${100 - 5 * 15}%;
        margin-left: -17px;
      }
      &:nth-child(n + 4) {
        display: block;
      }
      &:nth-child(n + 6) {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  &.pc-AvatarStack--right {
    justify-content: flex-end;
    .pc-AvatarItem {
      margin-left: 0 !important;
      margin-right: -11px;

      &:first-child {
        margin-right: 0;
      }
    }

    .pc-AvatarStackBody {
      flex-direction: row-reverse;

      &:hover {
        .pc-AvatarItem {
          margin-right: ${get('space.1')}!important;
          margin-left: 0 !important;

          &:first-child {
            margin-right: 0 !important;
          }
        }
      }
    }
  }

  &.pc-AvatarStack--three-plus.pc-AvatarStack--right {
    .pc-AvatarItem {
      &:nth-child(3) {
        margin-right: -17px;
      }
      &:nth-child(4) {
        margin-right: -17px;
      }
      &:nth-child(5) {
        margin-right: -17px;
      }
    }
  }

  .pc-AvatarStackBody:hover {
    width: auto;

    .pc-AvatarItem {
      margin-left: ${get('space.1')};
      opacity: 100%;
      visibility: visible;
      box-shadow: 0 0 0 4px ${get('colors.bg.canvas')};
      &:first-child {
        margin-left: 0;
      }
    }
  }

  ${COMMON}
  ${sx};
`
const transformChildren = (children: React.ReactNode) => {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child
    return React.cloneElement(child, {
      className: classnames(child.props.className, 'pc-AvatarItem'),
      sx: {zIndex: 10 - index, ...child.props.sx}
    })
  })
}

export type AvatarStackProps = {
  alignRight?: boolean
} & ComponentProps<typeof AvatarStackWrapper>

const AvatarStack = ({children, alignRight, ...rest}: AvatarStackProps) => {
  const count = React.Children.count(children)
  const wrapperClassNames = classnames({
    'pc-AvatarStack--two': count === 2,
    'pc-AvatarStack--three-plus': count > 2,
    'pc-AvatarStack--right': alignRight
  })
  return (
    <AvatarStackWrapper count={count} className={wrapperClassNames} {...rest}>
      <Box position="absolute" display="flex" width="38px" className="pc-AvatarStackBody">
        {transformChildren(children)}
      </Box>
    </AvatarStackWrapper>
  )
}

export default AvatarStack

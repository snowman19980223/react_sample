// eslint-disable-next-line import/no-namespace
import * as History from 'history'

import {COMMON, get} from './constants'
import styled, {css} from 'styled-components'

import Box from './Box'
import {ComponentProps} from './utils/types'
import Link from './Link'
import React from 'react'
import classnames from 'classnames'
import sx from './sx'

type SideNavBaseProps = {
  variant?: 'lightweight' | 'normal'
  bordered?: boolean
} & ComponentProps<typeof Box>

function SideNavBase({variant, className, bordered, children, ...props}: SideNavBaseProps) {
  const variantClassName = variant === 'lightweight' ? 'lightweight' : 'normal'
  const newClassName = classnames(className, `variant-${variantClassName}`)

  if (!bordered) {
    props = {...props, borderWidth: 0}
  }

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.default"
      borderRadius={2}
      as="nav"
      className={newClassName}
      {...props}
    >
      {children}
    </Box>
  )
}

const SideNav = styled(SideNavBase)`
  background-color: ${get('colors.canvas.subtle')};

  ${props =>
    props.bordered &&
    css`
      // Remove duplicate borders from nested SideNavs
      & > & {
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
      }
    `}

  ${COMMON};
  ${sx};
`
type StyledSideNavLinkProps = {
  to?: History.LocationDescriptor
  selected?: boolean
  variant?: 'full' | 'normal'
}

// used for variant normal hover, focus pseudo selectors
const CommonAccessibilityVariantNormalStyles = css`
  background-color: ${get('colors.neutral.subtle')};
  outline: none;
  text-decoration: none;
`

// used for light weight hover, focus pseudo selectors
const CommonAccessibilityVariantLightWeightStyles = css`
  color: ${get('colors.fg.default')};
  text-decoration: none;
  outline: none;
`

const SideNavLink = styled(Link).attrs<StyledSideNavLinkProps>(props => {
  const isReactRouter = typeof props.to === 'string'
  if (isReactRouter || props.selected) {
    // according to their docs, NavLink supports aria-current:
    // https://reacttraining.com/react-router/web/api/NavLink/aria-current-string
    return {'aria-current': 'page'}
  } else {
    return {}
  }
})<StyledSideNavLinkProps>`
  position: relative;
  display: block;
  ${props =>
    props.variant === 'full' &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
  width: 100%;
  text-align: left;
  font-size: ${get('fontSizes.1')};

  & > ${SideNav} {
    border-bottom: none;
  }

  ${SideNav}.variant-normal > & {
    color: ${get('colors.fg.default')};
    padding: ${get('space.3')};
    border: 0;
    border-top: ${get('borderWidths.1')} solid ${get('colors.border.muted')};

    &:first-child {
      border-top: 0;
      border-top-right-radius: ${get('radii.2')};
      border-top-left-radius: ${get('radii.2')};
    }

    &:last-child {
      border-bottom-right-radius: ${get('radii.2')};
      border-bottom-left-radius: ${get('radii.2')};
    }

    // Bar on the left
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 3px;
      pointer-events: none;
      content: '';
    }

    &:hover {
      ${CommonAccessibilityVariantNormalStyles}
    }

    &:focus {
      ${CommonAccessibilityVariantNormalStyles}
      box-shadow: ${get('shadows.primer.shadow.focus')};
      z-index: 1;
    }

    &[aria-current='page'],
    &[aria-selected='true'] {
      background-color: ${get('colors.sidenav.selectedBg')};

      // Bar on the left
      &::before {
        background-color: ${get('colors.primer.border.active')};
      }
    }
  }

  ${SideNav}.variant-lightweight > & {
    padding: ${get('space.1')} 0;
    color: ${get('colors.accent.fg')};

    &:hover {
      ${CommonAccessibilityVariantLightWeightStyles}
    }

    &:focus {
      ${CommonAccessibilityVariantLightWeightStyles}
      box-shadow: ${get('shadows.primer.shadow.focus')};
      z-index: 1;
    }

    &[aria-current='page'],
    &[aria-selected='true'] {
      color: ${get('colors.fg.default')};
      font-weight: ${get('fontWeights.semibold')};
    }
  }

  ${sx};
`

SideNav.defaultProps = {
  variant: 'normal'
}

SideNavLink.defaultProps = {
  variant: 'normal'
}

SideNavLink.displayName = 'SideNav.Link'

export type SideNavProps = ComponentProps<typeof SideNav>
export type SideNavLinkProps = ComponentProps<typeof SideNavLink>

export default Object.assign(SideNav, {Link: SideNavLink})

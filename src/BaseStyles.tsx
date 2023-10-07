import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {COMMON, SystemCommonProps, SystemTypographyProps, TYPOGRAPHY} from './constants'
import {useTheme} from './ThemeProvider'
import {ComponentProps} from './utils/types'

// load polyfill for :focus-visible
import 'focus-visible'

const GlobalStyle = createGlobalStyle<{colorScheme?: 'light' | 'dark'}>`
  * { box-sizing: border-box; }
  body { margin: 0; }
  table { border-collapse: collapse; }
  input { color-scheme: ${props => props.colorScheme}; }

  [role="button"]:focus:not(:focus-visible):not(.focus-visible),
  [role="tabpanel"][tabindex="0"]:focus:not(:focus-visible):not(.focus-visible),
  button:focus:not(:focus-visible):not(.focus-visible),
  summary:focus:not(:focus-visible):not(.focus-visible),
  a:focus:not(:focus-visible):not(.focus-visible) {
    outline: none;
    box-shadow: none;
  }

  [tabindex="0"]:focus:not(:focus-visible):not(.focus-visible),
  details-dialog:focus:not(:focus-visible):not(.focus-visible) {
    outline: none;
  }

  /* Used to fake conditional styles using a technique by Lea Verou: https://lea.verou.me/blog/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/ */
  /* We have to use a zero-width space character (\u200B) as the value instead of a regular whitespace character because styled-components strips out properties that just have a whitespace value. */
  :root {--prefers-link-underlines: \u200B;}
  [data-a11y-link-underlines='true'] {
    --prefers-link-underlines: initial;
  }
`

const Base = styled.div<SystemTypographyProps & SystemCommonProps>`
  ${TYPOGRAPHY};
  ${COMMON};
`

export type BaseStylesProps = ComponentProps<typeof Base>

function BaseStyles(props: BaseStylesProps) {
  const {children, color = 'fg.default', fontFamily = 'normal', lineHeight = 'default', ...rest} = props

  const {colorScheme, dayScheme, nightScheme} = useTheme()

  /**
   * We need to map valid primer/react color modes onto valid color modes for primer/primitives
   * valid color modes for primer/primitives: auto | light | dark
   * valid color modes for primer/primer: auto | day | night | light | dark
   */

  return (
    <Base
      {...rest}
      color={color}
      fontFamily={fontFamily}
      lineHeight={lineHeight}
      data-portal-root
      data-color-mode={colorScheme?.includes('dark') ? 'dark' : 'light'}
      data-light-theme={dayScheme}
      data-dark-theme={nightScheme}
    >
      <GlobalStyle colorScheme={colorScheme?.includes('dark') ? 'dark' : 'light'} />
      {children}
    </Base>
  )
}

export default BaseStyles

import React from 'react'
import {Flash} from '..'
import {COMMON} from '../constants'
import theme, {colors} from '../theme'
import {default as primitives} from '@primer/primitives'
import {render, behavesAsComponent, checkExports} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
expect.extend(toHaveNoViolations)

describe('Flash', () => {
  behavesAsComponent({Component: Flash, systemPropArray: [COMMON]})

  checkExports('Flash', {
    default: Flash
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<Flash variant="warning" theme={theme} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('respects the "full" prop', () => {
    expect(render(<Flash full />)).toHaveStyleRule('margin-top', '-1px')
    expect(render(<Flash full />)).toHaveStyleRule('border-radius', '0')
    expect(render(<Flash full />)).toHaveStyleRule('border-width', '1px 0px')
  })

  it('respects the "variant" prop', () => {
    expect(render(<Flash variant="warning" theme={theme} />)).toHaveStyleRule(
      'background-color',
      primitives.colors.light.alert.warn.bg
    )
    expect(render(<Flash variant="danger" theme={theme} />)).toHaveStyleRule(
      'background-color',
      primitives.colors.light.alert.error.bg
    )
    expect(render(<Flash variant="success" theme={theme} />)).toHaveStyleRule(
      'background-color',
      primitives.colors.light.alert.success.bg
    )
    expect(render(<Flash theme={theme} />)).toHaveStyleRule('background-color', primitives.colors.light.alert.info.bg)
  })
})

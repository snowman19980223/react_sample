import React from 'react'
import Caret, {CaretProps} from '../Caret'
import {render, checkExports} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
expect.extend(toHaveNoViolations)

describe('Caret', () => {
  it('renders <svg>', () => {
    expect(render(<Caret />).type).toEqual('svg')
  })

  checkExports('Caret', {
    default: Caret
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<Caret />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('renders cardinal directions', () => {
    for (const location of ['top', 'right', 'bottom', 'left']) {
      expect(render(<Caret location={location as CaretProps['location']} />)).toMatchSnapshot()
    }
    for (const location of ['top-left', 'top-right', 'bottom-left', 'bottom-right']) {
      expect(render(<Caret location={location as CaretProps['location']} />)).toMatchSnapshot()
    }
    for (const location of ['left-top', 'left-bottom', 'right-top', 'right-bottom']) {
      expect(render(<Caret location={location as CaretProps['location']} />)).toMatchSnapshot()
    }
  })
})

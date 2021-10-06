import React from 'react'
import {
  Button,
  ButtonPrimary,
  ButtonClose,
  ButtonDanger,
  ButtonOutline,
  ButtonInvisible,
  ButtonGroup,
  ButtonTableList
} from '..'
import {render, behavesAsComponent, checkExports} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

describe('Button', () => {
  behavesAsComponent({Component: Button})

  checkExports('Button', {
    default: Button,
    ButtonPrimary,
    ButtonDanger,
    ButtonOutline,
    ButtonInvisible,
    ButtonGroup,
    ButtonTableList,
    ButtonClose
  })

  it('renders a <button>', () => {
    expect(render(<Button />).type).toEqual('button')
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<Button>Click here</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('preserves "onClick" prop', () => {
    expect(render(<Button onClick={noop} />).props.onClick).toEqual(noop)
  })

  it('respects width props', () => {
    expect(render(<Button width={200} />)).toHaveStyleRule('width', '200px')
  })

  it('respects the "disabled" prop', () => {
    const item = render(<Button disabled />)
    expect(item.props.disabled).toEqual(true)
    expect(item).toMatchSnapshot()
  })

  it('respects the "variant" prop', () => {
    expect(render(<Button variant="small" />)).toHaveStyleRule('font-size', '12px')
    expect(render(<Button variant="large" />)).toHaveStyleRule('font-size', '16px')
  })

  it('respects the "fontSize" prop over the "variant" prop', () => {
    expect(render(<Button variant="small" fontSize={20} />)).toHaveStyleRule('font-size', '20px')
  })
})

describe('ButtonPrimary', () => {
  behavesAsComponent({Component: ButtonPrimary})

  it('renders a <button>', () => {
    expect(render(<ButtonPrimary />).type).toEqual('button')
  })

  it('renders correct disabled styles', () => {
    const item = render(<ButtonPrimary disabled />)
    expect(item).toMatchSnapshot()
  })
})

describe('ButtonDanger', () => {
  behavesAsComponent({Component: ButtonDanger})

  it('renders a <button>', () => {
    expect(render(<ButtonDanger />).type).toEqual('button')
  })

  it('renders correct disabled styles', () => {
    const item = render(<ButtonDanger disabled />)
    expect(item).toMatchSnapshot()
  })
})

describe('ButtonOutline', () => {
  behavesAsComponent({Component: ButtonOutline})

  it('renders a <button> by default', () => {
    expect(render(<ButtonOutline />).type).toEqual('button')
  })

  it('renders correct disabled styles', () => {
    const item = render(<ButtonOutline disabled />)
    expect(item).toMatchSnapshot()
  })
})

describe('ButtonInvisible', () => {
  behavesAsComponent({Component: ButtonOutline})

  it('renders a <button> by default', () => {
    expect(render(<ButtonInvisible />).type).toEqual('button')
  })

  it('renders correct disabled styles', () => {
    const item = render(<ButtonInvisible disabled />)
    expect(item).toMatchSnapshot()
  })
})

describe('ButtonGroup', () => {
  behavesAsComponent({Component: ButtonGroup})
})

describe('ButtonTableList', () => {
  behavesAsComponent({Component: ButtonTableList})
})

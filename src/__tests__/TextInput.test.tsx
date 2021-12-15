import React from 'react'
import {TextInput} from '..'
import {render, mount, behavesAsComponent, checkExports} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
import {SearchIcon} from '@primer/octicons-react'
expect.extend(toHaveNoViolations)

describe('TextInput', () => {
  behavesAsComponent({Component: TextInput, options: {skipAs: true}})

  checkExports('TextInput', {
    default: TextInput
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<TextInput aria-label="zipcode" name="zipcode" variant="small" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('renders', () => {
    expect(render(<TextInput name="zipcode" />)).toMatchSnapshot()
  })

  it('renders small', () => {
    expect(render(<TextInput name="zipcode" size="small" />)).toMatchSnapshot()
  })

  it('renders large', () => {
    expect(render(<TextInput name="zipcode" size="large" />)).toMatchSnapshot()
  })

  it('renders block', () => {
    expect(render(<TextInput name="zipcode" block />)).toMatchSnapshot()
  })

  it('renders warning', () => {
    expect(render(<TextInput name="zipcode" status="warning" />)).toMatchSnapshot()
  })

  it('renders error', () => {
    expect(render(<TextInput name="zipcode" status="error" />)).toMatchSnapshot()
  })

  it('renders contrast', () => {
    expect(render(<TextInput name="zipcode" status="contrast" />)).toMatchSnapshot()
  })

  it('renders placeholder', () => {
    expect(render(<TextInput name="zipcode" placeholder={'560076'} />)).toMatchSnapshot()
  })

  it('renders leadingVisual', () => {
    expect(render(<TextInput name="search" placeholder={'Search'} leadingVisual={SearchIcon} />)).toMatchSnapshot()
  })

  it('renders trailingVisual', () => {
    expect(render(<TextInput name="search" placeholder={'Search'} trailingVisual={SearchIcon} />)).toMatchSnapshot()
  })

  it('should call onChange prop with input value', () => {
    const onChangeMock = jest.fn()
    const component = mount(<TextInput onChange={onChangeMock} value="test" />)
    component.find('input').simulate('change')
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should render a password input', () => {
    expect(render(<TextInput name="password" type="password" />)).toMatchSnapshot()
  })
})

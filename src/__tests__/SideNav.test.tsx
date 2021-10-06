import React from 'react'
import {SideNav} from '..'
import {render, behavesAsComponent, mount, checkExports} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
expect.extend(toHaveNoViolations)

describe('SideNav', () => {
  behavesAsComponent({Component: SideNav})

  checkExports('SideNav', {
    default: SideNav
  })

  describe('SideNav.Link', () => {
    behavesAsComponent({Component: SideNav.Link})
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(
      <SideNav>
        <SideNav.Link href="#">One</SideNav.Link>
        <SideNav.Link href="#" selected>
          Two
        </SideNav.Link>
      </SideNav>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('renders a <nav> and <a>', () => {
    expect(render(<SideNav />).type).toEqual('nav')
    expect(render(<SideNav.Link />).type).toEqual('a')
  })

  it('sets aria-label appropriately', () => {
    expect(render(<SideNav aria-label="foo" />).props['aria-label']).toEqual('foo')
  })

  it('sets aria-current on a selected link', () => {
    const elem = (
      <SideNav>
        <SideNav.Link href="#one">One</SideNav.Link>
        <SideNav.Link href="#two" selected>
          Two
        </SideNav.Link>
      </SideNav>
    )
    const wrapper = mount(elem)
    expect(wrapper.find('[aria-current="page"]').text()).toEqual('Two')
  })

  it('sets different styles for SideNavs with the lightweight variant', () => {
    const regular = render(<SideNav />)
    const lightweight = render(<SideNav variant="lightweight" />)
    expect(regular.props.className).toEqual(expect.stringContaining('variant-normal'))
    expect(lightweight.props.className).toEqual(expect.stringContaining('variant-lightweight'))
  })
})

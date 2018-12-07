import React from 'react'
import FilterList from '../FilterList'
import {render, rendersClass, renderClasses, mount} from '../utils/testing'
import {COMMON} from '../system-props'

describe('FilterList', () => {
  it('implements common system props', () => {
    expect(FilterList).toImplementSystemProps(COMMON)
  })

  it('renders a <ul>', () => {
    expect(render(<FilterList />).type).toEqual('ul')
  })

  it('wraps children in <li>', () => {
    expect(render(<FilterList>Hello</FilterList>).children.pop().type).toEqual('li')
  })

  it('adds the filter-list class', () => {
    expect(rendersClass(<FilterList />, 'filter-list')).toEqual(true)
  })

  it('respects the "small" prop', () => {
    expect(rendersClass(<FilterList small />, 'small')).toEqual(true)
  })
})

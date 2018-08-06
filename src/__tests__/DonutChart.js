import React from 'react'
import DonutChart from '../DonutChart'
import DonutSlice from '../DonutSlice'
import theme, {colors} from '../theme'
import {render} from '../utils/testing'

describe('DonutChart', () => {
  it('renders the data prop', () => {
    const donut = render(<DonutChart data={{error: 1}} />)
    expect(donut).toMatchSnapshot()

    expect(donut.type).toEqual('svg')
    expect(donut.props.width).toEqual(30)
    expect(donut.props.height).toEqual(30)
    expect(donut.children).toHaveLength(1)

    const [g] = donut.children
    expect(g.type).toEqual('g')
    expect(g.children).toHaveLength(1)

    const [slice] = g.children
    expect(slice.type).toEqual('path')
    // expect(slice.props.fill).toEqual(colors.state.error)
  })

  it('renders DonutSlice children', () => {
    const donut = render(
      <DonutChart>
        <DonutSlice state="success" value={1} />
        <DonutSlice state="failure" value={1} />
      </DonutChart>
    )
    expect(donut).toMatchSnapshot()
    expect(donut.children).toHaveLength(1)
    const slices = donut.children[0].children
    expect(slices).toHaveLength(2)
    expect(slices.map(slice => slice.type)).toEqual(['path', 'path'])
    expect(slices[0].props.fill).toEqual(colors.state.success)
    expect(slices[1].props.fill).toEqual(colors.state.failure)
  })

  it('renders a single DonutSlice child', () => {
    const donut = render(
      <DonutChart>
        <DonutSlice state="success" value={1} />
      </DonutChart>
    )
    expect(donut).toMatchSnapshot()
    expect(donut.type).toEqual('svg')
  })

  it('respects margin utility prop', () => {
    expect(render(<DonutChart m={4} data={{error: 1}} />)).toHaveStyleRule('margin', `${theme.space[4]}.px`)
  })

  it('respects padding utility prop', () => {
    expect(render(<DonutChart p={4} data={{error: 1}} />)).toHaveStyleRule('padding', `${theme.space[4]}.px`)
  })
})

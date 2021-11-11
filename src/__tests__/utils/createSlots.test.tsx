import React from 'react'
import 'babel-polyfill'
import {render, waitFor} from '@testing-library/react'
import createSlots from '../../utils/create-slots'

// setup a component with slots
const {Slots, Slot} = createSlots(['One', 'Two', 'Three'])
type ContextTypes = {salutation?: string}

const ComponentWithSlots: React.FC<ContextTypes> = ({salutation, children}) => {
  return (
    <Slots context={{salutation}}>
      {slots => (
        <div>
          {slots.One}
          <span>
            {children} {slots.Two} {slots.Three}
          </span>
        </div>
      )}
    </Slots>
  )
}
const SlotItem1: React.FC = ({children}) => <Slot name="One">{children}</Slot>
const SlotItem2: React.FC = ({children}) => <Slot name="Two">{children}</Slot>
const SlotItem3: React.FC = ({children}) => (
  <Slot name="Three">
    {(context: ContextTypes) => (
      <>
        {context.salutation} {children}
      </>
    )}
  </Slot>
)

describe('ComponentWithSlots', () => {
  it('renders all slots', async () => {
    const component = render(
      <ComponentWithSlots>
        <SlotItem1>first</SlotItem1>
        <SlotItem2>second</SlotItem2>
        free form
      </ComponentWithSlots>
    )

    await waitFor(() => component.getByText('first'))
    expect(component.container).toMatchSnapshot()
  })

  it('renders without any slots', async () => {
    const component = render(<ComponentWithSlots>free form</ComponentWithSlots>)
    expect(component.container).toMatchSnapshot()
  })

  it('renders with just one slot', async () => {
    const component = render(
      <ComponentWithSlots>
        <SlotItem1>first</SlotItem1>
        free form
      </ComponentWithSlots>
    )
    expect(component.container).toMatchSnapshot()
  })

  it('renders with context passed to children', async () => {
    const component = render(
      <ComponentWithSlots salutation="hi">
        <SlotItem3>third</SlotItem3>
        free form
      </ComponentWithSlots>
    )
    expect(component.container).toMatchSnapshot()
  })
})

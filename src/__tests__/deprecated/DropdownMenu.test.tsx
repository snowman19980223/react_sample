import {render as HTMLRender, fireEvent} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import React from 'react'
import theme from '../../theme'
import {DropdownMenu, DropdownButton} from '../../deprecated'
import {behavesAsComponent, checkExports} from '../../utils/testing'
import {BaseStyles, ThemeProvider, SSRProvider} from '../..'
import {ItemInput} from '../../deprecated/ActionList/List'

expect.extend(toHaveNoViolations)

const items = [{text: 'Foo'}, {text: 'Bar'}, {text: 'Baz'}, {text: 'Bon'}] as ItemInput[]

function SimpleDropdownMenu(): JSX.Element {
  const [selectedItem, setSelectedItem] = React.useState<ItemInput | undefined>()

  return (
    <ThemeProvider theme={theme}>
      <SSRProvider>
        <BaseStyles>
          <div id="something-else">X</div>
          <DropdownMenu
            items={items}
            placeholder="Select an Option"
            selectedItem={selectedItem}
            onChange={setSelectedItem}
          />
          <div id="portal-root"></div>
        </BaseStyles>
      </SSRProvider>
    </ThemeProvider>
  )
}

describe('DropdownMenu', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  behavesAsComponent({
    Component: DropdownMenu,
    options: {skipAs: true, skipSx: true},
    toRender: () => (
      <SSRProvider>
        <DropdownMenu items={[]} />
      </SSRProvider>
    ),
  })

  checkExports('deprecated/DropdownMenu', {
    default: undefined,
    DropdownMenu,
    DropdownButton,
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<SimpleDropdownMenu />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should trigger the overlay on trigger click', async () => {
    const menu = HTMLRender(<SimpleDropdownMenu />)
    let portalRoot = menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeNull()
    const anchor = await menu.findByText('Select an Option')
    fireEvent.click(anchor)
    portalRoot = menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeTruthy()
    const itemText = items
      .map((i: ItemInput) => {
        if (i.hasOwnProperty('text')) {
          return i.text
        }
      })
      .join('')
    expect(portalRoot?.textContent?.trim()).toEqual(itemText)
  })

  it('should dismiss the overlay on dropdown item click', async () => {
    const menu = HTMLRender(<SimpleDropdownMenu />)
    let portalRoot = await menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeNull()
    const anchor = await menu.findByText('Select an Option')
    fireEvent.click(anchor)
    portalRoot = menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeTruthy()
    const menuItem = menu.queryByText('Baz')
    fireEvent.click(menuItem as Element)
    // portal is closed after click
    expect(portalRoot?.textContent).toEqual('') // menu items are hidden
  })

  it('option should be selected when chosen from the dropdown menu', async () => {
    const menu = HTMLRender(<SimpleDropdownMenu />)
    let portalRoot = await menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeNull()
    const anchor = await menu.findByText('Select an Option')
    fireEvent.click(anchor)
    portalRoot = menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeTruthy()
    const menuItem = menu.queryByText('Baz')
    fireEvent.click(menuItem as Element)
    expect(anchor.textContent).toEqual('Baz')
  })

  it('should dismiss the overlay on clicking outside overlay', async () => {
    const menu = HTMLRender(<SimpleDropdownMenu />)
    let portalRoot = await menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeNull()
    const anchor = await menu.findByText('Select an Option')
    fireEvent.click(anchor)
    portalRoot = menu.baseElement.querySelector('#__primerPortalRoot__')
    expect(portalRoot).toBeTruthy()
    const somethingElse = (await menu.baseElement.querySelector('#something-else')) as HTMLElement
    fireEvent.mouseDown(somethingElse)
    // portal is closed after click
    expect(portalRoot?.textContent).toEqual('') // menu items are hidden
  })
})

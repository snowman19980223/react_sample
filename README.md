<p align="center">
  <img width="300px" src="/static/assets/readme-components.png">
</p>

<h1 align="center">Primer Components</h1>

<p align="center">React components for the Primer Design System</p>

<p align="center">
  <a aria-label="npm package" href="https://www.npmjs.com/package/@primer/components">
    <img alt="" src="https://img.shields.io/npm/v/@primer/components.svg">
  </a>
  <a aria-label="contributors graph" href="https://github.com/primer/components/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/primer/components.svg">
  </a>
  <a aria-label="last commit" href="https://github.com/primer/components/commits/master">
    <img alt="" src=
  "https://img.shields.io/github/last-commit/primer/components.svg">
  </a>
  <a aria-label="join us in spectrum" href="https://spectrum.chat/?t=492cd17e-6e41-4e66-9160-2297e245b596">
    <img alt="" src="https://withspectrum.github.io/badge/badge.svg">
  </a>
  <a aria-label="license" href="https://github.com/primer/components/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/primer/components.svg" alt="">
  </a>
</p>


## Documentation

Our documentation site lives at [primer.style/components](https://primer.style/components). You'll be able to find the information listed in this README as well as detailed docs for each component, our theme, and system props.

## Installation

Install @primer/components in your project with npm:

```
npm install @primer/components
```

## Usage

All of our components are exported by name from `@primer/components`, so you can import them with:

```js
import {
  Box,
  Button,
  Heading,
  Text
} from '@primer/components'
```

Primer Components come with all the necessary CSS built-in, so you don't need to worry about including [Primer CSS].

#### Base styles

You can establish base Primer styles for your app by wrapping all of your Primer components in `<BaseStyles>`:

```jsx
import {BaseStyles, Box, Heading} from '@primer/components'

export default () => (
  <BaseStyles>
    <Box m={4}>
      <Heading mb={2}>Hello, world!</Heading>
      <p>This will get Primer text styles.</p>
    </Box>
  </BaseStyles>
)
```

This will set the `color`, `font-family`, and `line-height` CSS properties to the same ones used in [primer-base](https://github.com/primer/primer/blob/master/modules/primer-base/lib/base.scss#L15).

#### Theming

Components are styled using Primer's [theme](https://github.com/primer/components/blob/master/src/theme.js) by default, but you can provide your own theme by using [styled-component's][styled-components] `<ThemeProvider>`. If you'd like to fully replace the Primer [theme](https://github.com/primer/components/blob/master/src/theme.js) with your custom theme, pass your theme to the `<ThemeProvider>` in the root of your application like so:

```jsx
import {ThemeProvider} from 'styled-components'

const theme = { ... }

const App = (props) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>your app here</div>
      </ThemeProvider>
    </div>
  )
}

```

If you'd like to merge the Primer theme with your theme, you can do so importing the Primer theme and merging using Object.assign:

```jsx
import {ThemeProvider} from 'styled-components'
import {theme} from '@primer/components'

const customTheme = { ... }


const App = (props) => {
  return (
    <div>
      <ThemeProvider theme={Object.assign({}, theme, customTheme)}> // matching keys in customTheme will override keys in the Primer theme
        <div>your app here</div>
      </ThemeProvider>
    </div>
  )
}
```

*Note that using `Object.assign` will only create a shallow merge. This means that if both themes have a `color` object, the _entire_ `color` object will be replaced with the new `color` object, instead of only replacing duplicate values from the original theme's color object.

#### Static CSS rendering

If you're rendering React components both server-side _and_ client-side, we suggest following [styled-component's server-side rendering instructions](https://www.styled-components.com/docs/advanced#server-side-rendering) to avoid the flash of unstyled content for server-rendered components.

## Local Development

To run `@primer/components` locally when adding or updating components:

1. Clone this repo: `git clone https://github.com/primer/components`
1. Install dependencies in the repo root and `docs` subfolder: `pushd docs && npm install && popd && npm install`
1. Run the dev app: `npm start`

> 👉 See [the contributing docs](CONTRIBUTING.md) for more info on code style, testing, coverage, and troubleshooting.


## Principles

- Everything is a component.
- Aim for total style encapsulation; don't rely on inheritance to provide default styles.
- Build small building blocks with minimal props to keep complexity low.
- Keep system constrained by only including props needed per component.
- Favor extending or wrapping components for more complex operations.
- Maintain design system consistency with utilities as props (for spacing, color, font-size, line-height, widths, and radii).


[styled-components]: https://www.styled-components.com/docs
[Primer CSS]: https://github.com/primer/primer
[flash of unstyled content]: https://en.wikipedia.org/wiki/Flash_of_unstyled_content

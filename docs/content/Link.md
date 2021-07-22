---
title: Link
---

The Link component styles anchor tags with default hyperlink color cues and hover text decoration. `Link` is used for destinations, or moving from one page to another.

In special cases where you'd like a `<button>` styled like a `Link`, use `<Link as='button'>`. Make sure to provide a click handler with `onClick`.

**Important:** When using the `as` prop, be sure to always render an accessible element type, like `a`, `button`, `input`, or `summary`.

## Default example

```jsx live
<Link sx={{mb: 1}} href="https://github.com">
  Link
</Link>
```

## System props

<Note variant="warning">

System props are deprecated in all components except [Box](/Box). Please use the [`sx` prop](/overriding-styles) instead.

</Note>

Link components get `COMMON` and `TYPOGRAPHY` system props. Read our [System Props](/system-props) doc page for a full list of available props.

## Component props

| Name       | Type    | Default | Description                                                                     |
| :--------- | :------ | :-----: | :------------------------------------------------------------------------------ |
| href       | String  |         | URL to be used for the Link                                                     |
| muted      | Boolean |  false  | Uses a less prominent shade for Link color, and the default link shade on hover |
| underline  | Boolean |  false  | Adds underline to the Link                                                      |
| as         | String  |   'a'   | Can be 'a', 'button', 'input', or 'summary'                                     |
| hoverColor | String  |         | Color used when hovering over link                                              |

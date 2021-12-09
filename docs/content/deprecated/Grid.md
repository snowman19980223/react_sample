---
title: Grid
status: Deprecated
---

Grid is a component that exposes grid system props. See the [CSS Tricks Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) to learn more about Grid Layout.

## Deprecation

Use [Box](/Box) instead.

**Before**

```jsx
<Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
  <Box p={3} color="fg.onEmphasis" bg="accent.emphasis">
    1
  </Box>
  <Box p={3} color="fg.onEmphasis" bg="attention.emphasis">
    2
  </Box>
</Grid>
```

**After**

```jsx
<Box display="grid" gridTemplateColumns="repeat(2, auto)" gridGap={3}>
  <Box p={3} color="fg.onEmphasis" bg="accent.emphasis">
    1
  </Box>
  <Box p={3} color="fg.onEmphasis" bg="attention.emphasis">
    2
  </Box>
</Box>
```

## Default example

```jsx live
<Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
  <Box p={3} color="fg.onEmphasis" bg="accent.emphasis">
    1
  </Box>
  <Box p={3} color="fg.onEmphasis" bg="attention.emphasis">
    2
  </Box>
</Grid>
```

## System props

Grid components get `GRID`, `COMMON`, and `LAYOUT` system props.

Read our [System Props](/system-props) doc page for a full list of available props.

## Component props

`Grid` does not get any additional props other than the system props mentioned above.

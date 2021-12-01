import React from 'react'
import Box from '../Box'
import {get} from '../constants'
import {Theme} from '../ThemeProvider'
import {SxProp, merge} from '../sx'

/**
 * Visually separates `Item`s or `Group`s in an `ActionList`.
 */

export const Divider: React.FC<SxProp> = ({sx = {}}) => {
  return (
    <Box
      as="li"
      role="separator"
      sx={merge(
        {
          height: 1,
          backgroundColor: 'actionListItem.inlineDivider',
          marginTop: (theme: Theme) => `calc(${get('space.2')(theme)} - 1px)`,
          marginBottom: 2,
          listStyle: 'none' // hide the ::marker inserted by browser's stylesheet
        },
        sx as SxProp
      )}
      data-component="ActionList.Divider"
    />
  )
}

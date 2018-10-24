import {borders, borderColor, borderRadius, boxShadow} from 'styled-system'
import {withSystemProps, LAYOUT} from './system-props'

const BorderBox = withSystemProps(
  {
    is: 'div',
    bg: 'white',
    border: 1,
    borderColor: 'gray.2',
    borderRadius: 1
  },
  [...LAYOUT, borders, borderColor, borderRadius, boxShadow]
)

export default BorderBox

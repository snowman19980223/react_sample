import styled from 'styled-components'
import PropTypes from 'prop-types'
import {TYPOGRAPHY, COMMON, get} from './constants'
import theme from './theme'

const Heading = styled.h2`
  font-weight: ${get('fontWeights.bold')};
  font-size: ${get('fontSizes.5')};
  margin: 0;
  ${TYPOGRAPHY} ${COMMON};
`

Heading.defaultProps = {
  theme
}

Heading.propTypes = {
  theme: PropTypes.object,
  ...COMMON.propTypes,
  ...TYPOGRAPHY.propTypes
}

export default Heading

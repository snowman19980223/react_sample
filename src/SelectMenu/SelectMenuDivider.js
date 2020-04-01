import styled, {css} from 'styled-components'
import theme from '../theme'
import {COMMON, get} from '../constants'

const dividerStyles = css`
  padding: ${get('space.1')} ${get('space.3')};
  margin: 0;
  font-size: ${get('fontSizes.0')};
  font-weight: ${get('fontWeights.bold')};
  color: ${get('colors.text.grayLight')};
  background-color: ${get('colors.bg.gray')};
  border-bottom: ${get('borders.1')} ${get('colors.border.grayLight')};
`

const SelectMenuDivider = styled.div`
  ${dividerStyles}
  ${COMMON}
`

SelectMenuDivider.defaultProps = {
  theme
}

SelectMenuDivider.propTypes = {
  ...COMMON.propTypes
}

export default SelectMenuDivider

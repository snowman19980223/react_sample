import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import {GitMerge, IssueClosed, IssueOpened} from '@githubprimer/octicons-react'
import theme, {colors} from './theme'
import {withSystemProps, COMMON} from './system-props'
import Octicon from './Octicon'

const schemeMap = {
  closed: colors.red[6],
  merged: colors.purple[5],
  open: '#2cbe4e', // This was generated by a sass function in Primer, so using a hex here
  gray: colors.gray[5]
}

const octiconMap = {
  open: IssueOpened,
  closed: IssueClosed,
  merged: GitMerge
}

const getOcticon = (scheme, small) =>
  small ? <Octicon mr={1} width="1em" icon={octiconMap[scheme]} /> : <Octicon mr={1} icon={octiconMap[scheme]} />

function StateLabel({className, scheme, small = false, children}) {
  return (
    <span className={className}>
      {scheme && getOcticon(scheme, small)}
      {children}
    </span>
  )
}

const styledLabel = styled(StateLabel)`
  display: inline-flex;
  align-items: center;
  padding: ${props => (props.small ? `0.125em ${theme.space[1]}px` : `${theme.space[1]}px ${theme.space[2]}px`)};
  font-weight: 600;
  line-height: 20px;
  color: ${colors.white};
  font-size: ${props => (props.small ? `${theme.fontSizes[0]}px` : `${theme.fontSizes[1]}px`)};
  text-align: center;
  background-color: ${props => (props.scheme ? schemeMap[props.scheme] : schemeMap.gray)};
  border-radius: ${theme.radii[1]}px;
`

StateLabel.propTypes = {
  scheme: PropTypes.oneOf(['open', 'closed', 'merged']),
  small: PropTypes.bool
}

export default withSystemProps(styledLabel, COMMON)

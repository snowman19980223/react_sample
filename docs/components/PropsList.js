import React from 'react'
import PropTypes from 'prop-types'

const PropsList = ({systemProps}) => <div>{systemProps.propNames.join(', ')}</div>

PropsList.propTypes = {
  systemProps: PropTypes.arrayOf(PropTypes.string)
}

export default PropsList

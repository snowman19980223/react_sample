import styled from 'react-emotion'
import {compose} from 'ramda'
import * as system from 'styled-system'

export function getSystemProps(props) {
  return props.map(prop => {
    if (typeof system[prop] === 'function') {
      return system[prop]
    } else if (typeof prop === 'function') {
      return prop
    } else {
      throw new Error(`Unknown system prop: "%{prop}"`)
    }
  })
}

export function composeSystemProps(props) {
  const funcs = getSystemProps(props)
  const composed = compose(...funcs)
  composed.propTypes = funcs.reduce((types, func) => {
    return Object.assign(types, func.propTypes)
  }, {})
  return composed
}

export function withSystemProps(Component, props) {
  const composed = composeSystemProps(props)
  const Wrapped = styled(Component)(composed)
  Wrapped.propTypes = {
    ...Component.propTypes,
    ...composed.propTypes
  }
  return Wrapped
}

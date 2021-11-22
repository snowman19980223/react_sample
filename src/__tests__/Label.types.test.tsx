import React from 'react'
import Label from '../Label'

export function shouldAcceptCallWithNoProps() {
  return <Label />
}

export function shouldNotAcceptSystemProps() {
  // @ts-expect-error system props should not be accepted
  return <Label backgroundColor="mintcream" />
}

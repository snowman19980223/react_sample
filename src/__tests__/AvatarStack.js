/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import AvatarStack from '../AvatarStack'
import {render} from '../utils/testing'
import {COMMON} from '../constants'

const avatarComp = (
  <AvatarStack>
    <img src="https://avatars.githubusercontent.com/primer" />
    <img src="https://avatars.githubusercontent.com/github" />
    <img src="https://avatars.githubusercontent.com/primer" />
    <img src="https://avatars.githubusercontent.com/github" />
  </AvatarStack>
)

const rightAvatarComp = (
  <AvatarStack alignRight>
    <img src="https://avatars.githubusercontent.com/primer" />
    <img src="https://avatars.githubusercontent.com/github" />
    <img src="https://avatars.githubusercontent.com/primer" />
    <img src="https://avatars.githubusercontent.com/github" />
  </AvatarStack>
)

describe('Avatar', () => {
  it('implements common system props', () => {
    expect(AvatarStack).toImplementSystemProps(COMMON)
  })

  it('has default theme', () => {
    expect(AvatarStack).toSetDefaultTheme()
  })

  it('matches snapshot', () => {
    expect(render(avatarComp)).toMatchSnapshot()
  })

  it('respects alignRight props', () => {
    expect(render(rightAvatarComp)).toMatchSnapshot()
  })
})

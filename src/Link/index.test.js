import React from 'react'
import { shallow } from 'enzyme'
import Link from './index'

describe('Link component', () => {
  it('renders text', () => {
    const wrapper = shallow(<Link to="/">testLink</Link>)
      .find('Link')
      .shallow()

    const text = wrapper.find('a').text()

    expect(text).toEqual('testLink')
  })
  it('renders html', () => {
    const wrapper = shallow(
      <Link to="/">
        <span>hello</span>
      </Link>
    )
      .find('Link')
      .shallow()

    expect(wrapper.contains(<span>hello</span>)).toEqual(true)
  })
})

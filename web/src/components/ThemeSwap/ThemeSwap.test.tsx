import { render } from '@redwoodjs/testing/web'

import ThemeSwap from './ThemeSwap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeSwap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeSwap />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import LanguageSwap from './LanguageSwap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LanguageSwap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LanguageSwap />)
    }).not.toThrow()
  })
})

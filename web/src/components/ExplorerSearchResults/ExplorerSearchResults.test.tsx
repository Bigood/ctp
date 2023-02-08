import { render } from '@redwoodjs/testing/web'

import ExplorerSearchResults from './ExplorerSearchResults'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExplorerSearchResults', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExplorerSearchResults />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import ExplorerSearch from './ExplorerSearch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExplorerSearch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExplorerSearch />)
    }).not.toThrow()
  })
})

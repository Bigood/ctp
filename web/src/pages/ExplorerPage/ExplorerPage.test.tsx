import { render } from '@redwoodjs/testing/web'

import ExplorerPage from './ExplorerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ExplorerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExplorerPage />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import InitiativesPage from './InitiativesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InitiativesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InitiativesPage />)
    }).not.toThrow()
  })
})

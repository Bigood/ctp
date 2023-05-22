import { render } from '@redwoodjs/testing/web'

import InitiativePage from './InitiativePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InitiativePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InitiativePage />)
    }).not.toThrow()
  })
})

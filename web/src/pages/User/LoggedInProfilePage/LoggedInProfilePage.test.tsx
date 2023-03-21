import { render } from '@redwoodjs/testing/web'

import LoggedInProfilePage from './LoggedInProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoggedInProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoggedInProfilePage />)
    }).not.toThrow()
  })
})

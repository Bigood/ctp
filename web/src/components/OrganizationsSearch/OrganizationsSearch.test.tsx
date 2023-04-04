import { render } from '@redwoodjs/testing/web'

import OrganizationsSearch from './OrganizationsSearch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationsSearch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationsSearch />)
    }).not.toThrow()
  })
})

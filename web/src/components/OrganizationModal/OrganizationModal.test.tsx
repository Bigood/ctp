import { render } from '@redwoodjs/testing/web'

import OrganizationModal from './OrganizationModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrganizationModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrganizationModal />)
    }).not.toThrow()
  })
})

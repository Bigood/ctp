import { render } from '@redwoodjs/testing/web'

import InputGeocoding from './InputGeocoding'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InputGeocoding', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InputGeocoding />)
    }).not.toThrow()
  })
})

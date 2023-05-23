import { render } from '@redwoodjs/testing/web'

import InitiativeCard from './InitiativeCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InitiativeCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InitiativeCard />)
    }).not.toThrow()
  })
})

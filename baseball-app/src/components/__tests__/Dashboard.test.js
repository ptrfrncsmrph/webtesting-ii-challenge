import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import "jest-dom/extend-expect"

import Dashboard from "../Dashboard"
import { actions } from "../App"

const actionSuite = actions => {
  Object.keys(actions).forEach(action => {
    it("strike button dispatches strike action", () => {
      const dispatch = jest.fn()
      const { getByText } = render(
        <Dashboard dispatch={dispatch} actions={Object.keys(actions)} />
      )
      fireEvent.click(getByText(new RegExp(action)))
      expect(dispatch).toHaveBeenCalledWith(action)
      cleanup()
    })
  })
}

actionSuite(actions)

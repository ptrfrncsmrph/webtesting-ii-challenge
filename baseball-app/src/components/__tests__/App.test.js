import React from "react"
import ReactDOM from "react-dom"
import { render, fireEvent, cleanup } from "react-testing-library"
import "jest-dom/extend-expect"

import App from "../App"

const repeatAction = num => action =>
  num > 0 && (action(), repeatAction(num - 1)(action))

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe("Display", () => {
  it("strike count works", () => {
    const { getByText, getAllByText } = render(<App />)

    const ballCount = getByText(/balls/i)
    const [strikeCount, strikeBtn] = getAllByText(/strike/i)

    const click = _ => fireEvent.click(strikeBtn)

    repeatAction(1)(click)
    expect(ballCount).toHaveTextContent(0)
    expect(strikeCount).toHaveTextContent(1)

    repeatAction(2)(click)
    expect(ballCount).toHaveTextContent(0)
    expect(strikeCount).toHaveTextContent(0)

    repeatAction(3)(click)
    expect(ballCount).toHaveTextContent(0)
    expect(strikeCount).toHaveTextContent(0)

    cleanup()
  })

  it("ball count works", () => {
    const { getByText, getAllByText } = render(<App />)

    const strikeCount = getByText(/strikes/i)
    const [ballCount, ballBtn] = getAllByText(/ball/i)

    const click = _ => fireEvent.click(ballBtn)

    repeatAction(3)(click)
    expect(ballCount).toHaveTextContent(3)
    expect(strikeCount).toHaveTextContent(0)

    repeatAction(3)(click)
    expect(ballCount).toHaveTextContent(2)
    expect(strikeCount).toHaveTextContent(0)
    cleanup()
  })

  it("hit resets count", () => {
    const { getByText } = render(<App />)

    const strikeCount = getByText(/strikes/i)
    const ballCount = getByText(/ball/i)
    const strikeBtn = getByText(/strike$/i)
    const ballBtn = getByText(/ball$/i)
    const hitBtn = getByText(/hit$/i)

    const click = btn => _ => fireEvent.click(btn)

    repeatAction(3)(click(strikeBtn))
    repeatAction(2)(click(ballBtn))
    expect(ballCount).toHaveTextContent(2)
    expect(strikeCount).toHaveTextContent(0)

    repeatAction(1)(click(hitBtn))
    expect(ballCount).toHaveTextContent(0)
    expect(strikeCount).toHaveTextContent(0)

    repeatAction(2)(click(strikeBtn))
    expect(ballCount).toHaveTextContent(0)
    expect(strikeCount).toHaveTextContent(2)

    repeatAction(1)(click(hitBtn))
    expect(ballCount).toHaveTextContent(0)
    expect(strikeCount).toHaveTextContent(0)
    cleanup()
  })

  it("foul doesn't strike out", () => {
    const { getByText } = render(<App />)

    const strikeCount = getByText(/strikes/i)
    const ballCount = getByText(/ball/i)
    const strikeBtn = getByText(/strike$/i)
    const ballBtn = getByText(/ball$/i)
    const foulBtn = getByText(/foul$/i)

    const click = btn => _ => fireEvent.click(btn)

    repeatAction(3)(click(strikeBtn))
    repeatAction(2)(click(ballBtn))
    expect(ballCount).toHaveTextContent(2)
    expect(strikeCount).toHaveTextContent(0)

    repeatAction(3)(click(foulBtn))
    expect(ballCount).toHaveTextContent(2)
    expect(strikeCount).toHaveTextContent(2)

    repeatAction(4)(click(foulBtn))
    expect(ballCount).toHaveTextContent(2)
    expect(strikeCount).toHaveTextContent(2)
    cleanup()
  })
})

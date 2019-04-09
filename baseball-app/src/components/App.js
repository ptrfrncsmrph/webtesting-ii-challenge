import React, { useReducer } from "react"
import Display from "./Display"
import Dashboard from "./Dashboard"
import "./App.scss"

export const actions = ["strike", "ball", "hit", "foul"].reduce(
  (acc, a) => ({ ...acc, [a]: a }),
  {}
)

const { strike, ball, hit, foul } = actions

const initialState = {
  balls: 0,
  strikes: 0
}

const reducer = (state, action) => {
  switch (action) {
    case strike:
      return state.strikes === 2
        ? initialState
        : { ...state, strikes: state.strikes + 1 }
    case ball:
      return state.balls === 3
        ? initialState
        : { ...state, balls: state.balls + 1 }
    case hit:
      return initialState
    case foul:
      return { ...state, strikes: Math.min(state.strikes + 1, 2) }

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <Display {...state} />
      <Dashboard dispatch={dispatch} actions={Object.keys(actions)} />
    </>
  )
}

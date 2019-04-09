import React from "react"

export default function Display({ balls, strikes }) {
  return (
    <>
      <h2>Display</h2>
      <h3>{balls} Balls</h3>
      <h3>{strikes} Strikes</h3>
    </>
  )
}

import React from "react"

export default function Dashboard({ dispatch, actions }) {
  const handleDispatch = action => _e => dispatch(action)
  return (
    <>
      <h2>Dashboard</h2>
      {actions.map(action => (
        <button key={action} onClick={handleDispatch(action)}>
          {action}
        </button>
      ))}
    </>
  )
}

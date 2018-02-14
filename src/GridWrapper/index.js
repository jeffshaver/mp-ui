import React from 'react'

const GridWrapper = ({ children }) => {
  const padding = (children.props.spacing || 16) / 2

  return <div style={{ padding }}>{children}</div>
}

export default GridWrapper

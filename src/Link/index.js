// React
import React from 'react'
// Material-UI
import { withStyles } from 'material-ui/styles'
// Utilities
import history from '../history'

const styles = {
  a: {
    cursor: 'pointer'
  }
}
const go = to => {
  history.push(to)
}

const Link = props => {
  const { children, classes, to } = props

  return (
    <a className={classes.a} onClick={() => go(to)}>
      {children}
    </a>
  )
}

export default withStyles(styles)(Link)

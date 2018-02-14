// React
import React, { Component } from 'react'
// Material-UI
import AppBar from 'material-ui/AppBar'
import grey from 'material-ui/colors/grey'
import { MuiThemeProvider, withStyles } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
// Components
import Home from './Home'
import LeftNav from './LeftNav'
// Utilities
import theme from './theme'

const styles = {
  app: {
    color: grey[800]
  },
  appBar: {
    width: 'calc(100% - 250px)'
  },
  content: {
    padding: '64px 0 0 250px'
  },
  flex: {
    flex: 1
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }
  componentWillMount() {
    fetch('http://localhost:3001/all')
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ data })
      })
  }

  render() {
    const { classes } = this.props
    const { data } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Reboot />
          <LeftNav />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Title
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Home data={data} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)

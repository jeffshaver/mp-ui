// React
import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
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
import ResourceListPage from './ResourceListPage'
// Utilities
import history from './history'
import theme from './theme'
// Data
import daemonSetResource from './data/resource-types/daemon-sets'
import deploymentResource from './data/resource-types/deployments'
import jobResource from './data/resource-types/jobs'
import podResource from './data/resource-types/pods'
import replicaSetResource from './data/resource-types/replica-sets'
import replicationControllerResource from './data/resource-types/replication-controllers'
import statefulSetResource from './data/resource-types/stateful-sets'

const routes = [
  {
    dataKey: 'daemonsets',
    path: '/daemon-sets',
    resource: daemonSetResource
  },
  {
    dataKey: 'deployments',
    path: '/deployments',
    resource: deploymentResource
  },
  {
    dataKey: 'jobs',
    path: '/jobs',
    resource: jobResource
  },
  {
    dataKey: 'pods',
    path: '/pods',
    resource: podResource
  },
  {
    dataKey: 'replicasets',
    path: '/replica-sets',
    resource: replicaSetResource
  },
  {
    dataKey: 'replicationcontrollers',
    path: '/replication-controllers',
    resource: replicationControllerResource
  },
  {
    dataKey: 'statefulsets',
    path: '/stateful-sets',
    resource: statefulSetResource
  }
]

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
            <Router history={history}>
              <Switch>
                <Route exact path="/" render={() => <Home data={data} />} />
                {routes.map(({ dataKey, path, resource }) => (
                  <Route
                    exact
                    key={path}
                    path={path}
                    render={() => (
                      <ResourceListPage
                        resource={resource}
                        data={data[dataKey]}
                      />
                    )}
                  />
                ))}
              </Switch>
            </Router>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)

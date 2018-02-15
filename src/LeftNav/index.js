// React
import React, { Component } from 'react'
// Material-UI
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import grey from 'material-ui/colors/grey'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
// Components
import Link from '../Link'

const menuItems = [
  { title: 'Daemon Sets', path: 'daemon-sets' },
  { title: 'Deployments', path: 'deployments' },
  { title: 'Jobs', path: 'jobs' },
  { title: 'Namespaces', path: 'namespaces' },
  { title: 'Persistent Volumes', path: 'persistent-volumes' },
  { title: 'Pods', path: 'pods' },
  { title: 'Replica Sets', path: 'replica-sets' },
  { title: 'Replication Controllers', path: 'replication-controllers' },
  { title: 'Roles', path: 'roles' },
  { title: 'Stateful Sets', path: 'stateful-sets' }
]
const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 16px',
    ...theme.mixins.toolbar
  },
  drawerHeaderLink: {
    color: grey[600],
    textDecoration: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    }
  },
  paper: {
    width: 250
  }
})

class LeftNav extends Component {
  render() {
    const { classes } = this.props

    return (
      <Drawer
        anchor="left"
        variant="permanent"
        classes={{ paper: classes.paper }}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <Link to="/" className={classes.drawerHeaderLink}>
              <Typography className={classes.drawerHeaderLink} variant="title">
                MP-UI
              </Typography>
            </Link>
          </div>
          <Divider />
          <List component="nav" dense={true}>
            {menuItems.map(({ path, title }, i) => (
              <Link key={title} to={path}>
                <ListItem button>
                  <ListItemText
                    primary={<Typography variant="body2">{title}</Typography>}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(LeftNav)

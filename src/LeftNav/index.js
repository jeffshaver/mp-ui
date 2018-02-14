import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import grey from 'material-ui/colors/grey'
import List, { ListItem, ListItemText } from 'material-ui/List'
import React, { Component, Fragment } from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const menuItems = [
  'Daemon Sets',
  'Deployments',
  'Jobs',
  'Namespaces',
  'Persistent Volumes',
  'Pods',
  'Replica Sets',
  'Replication Controllers',
  'Roles',
  'Stateful Sets'
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
            <a href="/" className={classes.drawerHeaderLink}>
              <Typography className={classes.drawerHeaderLink} variant="title">
                MP-UI
              </Typography>
            </a>
          </div>
          <Divider />
          <List component="nav" dense={true}>
            {menuItems.map((menuItem, i) => (
              <Fragment key={menuItem}>
                {/* {i !== 0 && <Divider light={true} />} */}
                <ListItem button>
                  <ListItemText
                    primary={
                      <Typography variant="body2">{menuItem}</Typography>
                    }
                  />
                </ListItem>
              </Fragment>
            ))}
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(LeftNav)

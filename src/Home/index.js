// React
import React, { Component } from 'react'
// Material-UI
import Grid from 'material-ui/Grid'
// Components
import GridWrapper from '../GridWrapper'
import Resource from '../Resource'
// Utilities
import moment from 'moment'
// Data
import deploymentColumns from '../data/columns/deployments'
import jobColumns from '../data/columns/jobs'
import podColumns from '../data/columns/pods'

const columns = [
  {
    title: 'Namespace',
    key: 'metadata.namespace'
  },
  {
    title: 'Name',
    key: 'metadata.name'
  },
  {
    title: 'Desired',
    key: 'status.replicas'
  },
  {
    title: 'Current',
    key: 'status.readyReplicas'
  },
  {
    title: 'Up-To-Date',
    key: 'status.updatedReplicas'
  },
  {
    title: 'Available',
    key: 'status.availableReplicas',
    modifier: (value, object) => {
      const { unavailableReplicas } = object.status

      if (unavailableReplicas) {
        return (value || 1) - unavailableReplicas
      }

      return value
    }
  },
  {
    title: 'Age',
    key: 'metadata.creationTimestamp',
    modifier: value => moment(value).fromNow(true)
  }
]
const resources = [
  {
    kind: 'Daemon Sets',
    columns
  },
  {
    kind: 'Deployments',
    columns: deploymentColumns
  },
  {
    kind: 'Jobs',
    columns: jobColumns
  },
  {
    kind: 'Pods',
    columns: podColumns,
    sort: (a, b, columns) => {
      const dateA = new Date(a.status.startTime)
      const dateB = new Date(b.status.startTime)

      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
    }
  },
  {
    kind: 'Replica Sets',
    columns: deploymentColumns
  },
  {
    kind: 'Replication Controllers',
    columns
  },
  {
    kind: 'Stateful Sets',
    columns
  }
]

class Home extends Component {
  render() {
    const { data } = this.props

    return (
      <GridWrapper>
        <Grid container spacing={24}>
          {resources.map(resource => (
            <Grid item xs={12} key={resource.kind}>
              <Resource
                resource={resource}
                data={data[resource.kind.replace(' ', '').toLowerCase()]}
              />
            </Grid>
          ))}
        </Grid>
      </GridWrapper>
    )
  }
}

export default Home

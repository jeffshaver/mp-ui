// React
import React, { Component } from 'react'
// Material-UI
import Card from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import Typography from 'material-ui/Typography'
// Components
import GridWrapper from '../GridWrapper'
// Utilities
import moment from 'moment'
import nestedProperty from 'nested-property'
// Data
import deploymentColumns from '../data/columns/deployments'
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
    columns
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
          {resources.map(({ kind, columns, sort }) => (
            <Grid item xs={12} key={kind}>
              <Card>
                <Typography variant="headline" style={{ textAlign: 'center' }}>
                  {kind}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map(({ title, type }) => (
                        <TableCell key={title} numeric={type === 'numeric'}>
                          {title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(() => {
                      const rowData = (
                        data[kind.replace(' ', '').toLowerCase()] || []
                      ).sort(sort)

                      if (rowData.length === 0) {
                        return (
                          <TableRow>
                            <TableCell colSpan={columns.length}>
                              <Typography
                                variant="subheading"
                                style={{ textAlign: 'center' }}
                              >
                                No Data
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      }

                      return rowData.map(data => (
                        <TableRow
                          key={data.metadata.namespace + data.metadata.name}
                        >
                          {columns.map(
                            ({ defaultValue, key, modifier, title, type }) => (
                              <TableCell
                                key={key + title}
                                numeric={type === 'numeric'}
                              >
                                {(() => {
                                  if (!key) {
                                    return defaultValue
                                  }

                                  const value =
                                    nestedProperty.get(data, key) || 0

                                  if (modifier) {
                                    return modifier(value, data)
                                  }

                                  return value
                                })()}
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      ))
                    })()}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
          ))}
        </Grid>
      </GridWrapper>
    )
  }
}

export default Home

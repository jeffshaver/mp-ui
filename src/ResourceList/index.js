// React
import React, { Component } from 'react'
// Material-UI
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
// Utilities
import nestedProperty from 'nested-property'

const styles = ({ palette: { text: { disabled } }, spacing: { unit } }) => ({
  card: {
    overflowX: 'auto'
  },
  heading: {
    padding: `${(unit + 'px ').repeat(3)}${unit * 3}px`
  },
  noData: {
    color: disabled,
    textAlign: 'center'
  }
})

class Resource extends Component {
  render() {
    const { classes, data, resource: { kind, columns, sort } } = this.props

    return (
      <Card className={classes.card}>
        <Typography variant="headline" className={classes.heading}>
          {kind}
        </Typography>
        <Divider light={true} />
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ title, type }) => (
                <TableCell
                  key={title}
                  numeric={type === 'numeric'}
                  style={{ width: `${100 / columns.length}%` }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
              const rowData = (data || []).sort(sort)

              if (rowData.length === 0) {
                return (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Typography
                        className={classes.noData}
                        variant="subheading"
                      >
                        No Data
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              }

              return rowData.map(data => (
                <TableRow key={data.metadata.namespace + data.metadata.name}>
                  {columns.map(
                    ({ defaultValue, key, modifier, title, type }) => (
                      <TableCell key={key + title} numeric={type === 'numeric'}>
                        {(() => {
                          if (!key) {
                            return defaultValue
                          }

                          const value =
                            nestedProperty.get(data, key) || defaultValue

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
    )
  }
}

export default withStyles(styles)(Resource)

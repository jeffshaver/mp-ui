// React
import React from 'react'
// Material-UI
import Chip from 'material-ui/Chip'
// Utilities
import moment from 'moment'

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
    title: 'Labels',
    key: 'metadata.labels',
    modifier: labels => {
      return Object.keys(labels).map(key => {
        return (
          <Chip
            key={key + labels[key]}
            label={`${key}:${labels[key]}`}
            style={{ margin: '.25rem' }}
          />
        )
      })
    }
  },
  {
    defaultValue: 0,
    key: 'spec.completions',
    title: 'Pods',
    modifier: (completions, { status: { active } }) =>
      `${active ? active : 0}/${completions}`
  },
  {
    title: 'Age',
    key: 'metadata.creationTimestamp',
    modifier: timestamp => moment(timestamp).fromNow(true)
  },
  {
    title: 'Images',
    key: 'spec.template.spec.containers',
    modifier: containers =>
      containers.map(container => (
        <p
          key={container.image}
          style={{ margin: '.25rem', whiteSpace: 'nowrap' }}
        >
          {container.image}
        </p>
      ))
  }
]

export default columns

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
    title: 'Node',
    key: 'spec.nodeName'
  },
  {
    title: 'Status',
    key: 'status.phase'
  },
  {
    defaultValue: 0,
    key: 'status.containerStatuses.0.restartCount',
    title: 'Restarts',
    type: 'numeric'
  },
  {
    title: 'Age',
    key: 'metadata.creationTimestamp',
    modifier: value => moment(value).fromNow(true)
  }
]

export default columns

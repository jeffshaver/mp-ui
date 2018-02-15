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

export default columns

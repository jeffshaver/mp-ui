require('dotenv').config({ silent: true })

const cors = require('cors')
const fs = require('fs')
const k8s = require('k8s')
const express = require('express')

const { KUBERNETES_ENDPOINT, KUBERNETES_TOKEN_PATH } = process.env
const kubernetesToken = fs
  .readFileSync(KUBERNETES_TOKEN_PATH)
  .toString()
  .replace('\n', '')

console.log(KUBERNETES_ENDPOINT)

const kubeApiOptions = {
  auth: {
    token: kubernetesToken
  },
  endpoint: KUBERNETES_ENDPOINT,
  strictSSL: false
}

const apis = {
  stable: k8s.api(Object.assign({}, kubeApiOptions, { version: '/api/v1' })),
  app: k8s.api(
    Object.assign({}, kubeApiOptions, { version: '/apis/apps/v1beta1' })
  ),
  beta: k8s.api(
    Object.assign({}, kubeApiOptions, { version: '/apis/extensions/v1beta1' })
  ),
  batch: k8s.api(
    Object.assign({}, kubeApiOptions, { version: '/apis/batch/v1' })
  )
}

const resourceDescriptors = [
  {
    endpoint: 'daemonsets',
    name: 'daemonsets',
    type: 'beta'
  },
  {
    endpoint: 'deployments',
    name: 'deployments',
    type: 'beta'
  },
  {
    endpoint: 'jobs',
    name: 'jobs',
    type: 'batch'
  },
  {
    endpoint: 'pods',
    name: 'pods',
    type: 'stable'
  },
  {
    endpoint: 'replicasets',
    name: 'replicasets',
    type: 'beta'
  },
  {
    endpoint: 'replicationcontrollers',
    name: 'replicationcontrollers',
    type: 'stable'
  },
  {
    endpoint: 'statefulsets',
    name: 'statefulsets',
    type: 'app'
  }
]

const app = express()
const resourceFunctions = []

app.use(cors())

app.get('/all', (req, res) => getAllResources(req, res))

app.listen(3001, () => console.log('Example app listening on port 3001!'))

resourceDescriptors.forEach(resourceDescriptor => {
  const { name } = resourceDescriptor
  const get = getResource(resourceDescriptor)

  resourceFunctions.push(get)

  app.get(`/${name}`, (req, res) => routeHandler(req, res, get))
})

function getResource({ endpoint, name, type }) {
  return get

  async function get() {
    try {
      const data = await apis[type].get(endpoint)

      return data.items
    } catch (e) {
      console.error(e)
    }
  }
}

async function getAllResources(req, res) {
  const data = await Promise.all(resourceFunctions.map(fn => fn()))
  const ret = {}

  resourceDescriptors.forEach(({ name }, i) => {
    ret[name] = data[i]
  })

  console.log(ret)
  res.send(ret)
}

async function routeHandler(req, res, get) {
  try {
    const data = await get()

    res.json(data)
  } catch (e) {
    console.error(e)
  }
}

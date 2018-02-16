// React
import React from 'react'
// Material-UI
import Grid from 'material-ui/Grid'
// Components
import GridWrapper from '../GridWrapper'
import ResourceList from '../ResourceList'

const ResourcePage = ({ data, resource }) => (
  <GridWrapper>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <ResourceList data={data} resource={resource} />
      </Grid>
    </Grid>
  </GridWrapper>
)

export default ResourcePage

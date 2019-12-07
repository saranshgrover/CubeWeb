import React from 'react'
import { Route } from 'react-router-dom'

import Competition from './Competition/Competition'
import ActivityResult from './ActivityResult/ActivityResult'

interface Props {}

function Results({}: Props): React.ReactElement {
  return (
    <>
      <Route
        path='/competitions/:competitionId/:activityCode'
        compoenent={ActivityResult}
      />
      <Route path='/competitions/:competitionId' component={Competition} />
    </>
  )
}

export default Results

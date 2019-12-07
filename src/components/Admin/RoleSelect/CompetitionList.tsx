import React, { useState } from 'react'
import { Container, Grid, Typography, Paper } from '@material-ui/core'
import { getMyUpcomingComps } from '../../../server/wca-api'

interface WCAUser {
    name?: string
    wca_id?: string
}

interface WCAComp {
    name: string
    id: string
}

interface Props {
    userInfo: WCAUser
}

export default function CompetitionList({
    userInfo
}: Props): React.ReactElement {
    const [userRequest, setUserRequest] = useState({
        userComps: [],
        gotUserComps: false
    })
    if (!userRequest.gotUserComps) {
        console.log('Running upcoming comps...')
        getMyUpcomingComps(userInfo.wca_id || '').then(results => {
            setUserRequest({
                userComps: results.upcoming_competitions,
                gotUserComps: true
            })
        })
    }
    return (
        <div>
            <Container>
                <Grid container direction='column' justify='center'></Grid>
                {userRequest.gotUserComps &&
                    userRequest.userComps.map((comp: WCAComp) => {
                        return (
                            <Grid key={comp.id} item>
                                <Paper
                                    style={{
                                        marginTop: '10px',
                                        background: 'lightgrey'
                                    }}
                                >
                                    <Typography variant='h3'>
                                        {comp.name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                    })}
            </Container>
        </div>
    )
}

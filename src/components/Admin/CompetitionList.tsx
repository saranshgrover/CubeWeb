import React, { useState } from 'react'
import {
    Container,
    Grid,
    Typography,
    Paper,
    TextField
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { getMyManagableComps } from '../../server/wca-api'
import { History } from 'history'

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
    history: History
}

export default function CompetitionList({
    userInfo,
    history
}: Props): React.ReactElement {
    const [userRequest, setUserRequest] = useState({
        userComps: [],
        gotUserComps: false
    })

    const [search, setSearch] = useState('')

    const setCompToLocalStorage = (competitionId: string) => {
        console.log('Running...')
        window.localStorage.setItem('competitionId', competitionId)
        history.push('/admin/role')
    }

    if (!userRequest.gotUserComps) {
        console.log('Running managable comps...')
        getMyManagableComps().then(results => {
            console.log(results)
            setUserRequest({
                userComps: results,
                gotUserComps: true
            })
        })
    }

    const filterComps = (arr: Array<WCAComp> | undefined): Array<WCAComp> => {
        if (typeof arr === 'undefined') return []
        else if (search === '') return arr
        else
            return arr.filter(
                (comp: WCAComp) =>
                    comp.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
    }
    return (
        <div>
            <Container style={{ textAlign: 'left' }}>
                <TextField
                    label='Search'
                    autoFocus
                    onChange={e => setSearch(e.target.value)}
                    type='search'
                    style={{ width: '400px' }}
                />
                <Grid container direction='column' justify='center'></Grid>
                {userRequest.gotUserComps &&
                    filterComps(userRequest.userComps).map((comp: WCAComp) => {
                        return (
                            <Grid
                                style={{ cursor: 'pointer' }}
                                key={comp.id}
                                item
                                onClick={() => setCompToLocalStorage(comp.id)}
                            >
                                <Paper
                                    style={{
                                        marginTop: '10px',
                                        background: 'lightgrey',
                                        padding: '8px'
                                    }}
                                >
                                    <Typography variant='h5'>
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

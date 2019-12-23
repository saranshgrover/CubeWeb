import React, { useState, useEffect } from 'react'
import {
    Button,
    Typography,
    CircularProgress,
    Container
} from '@material-ui/core'
import { signIn, signOut, isSignedIn } from '../../../server/auth'
import { getMe } from '../../../server/wca-api'
import { History } from 'history'
import { getWcifPublic } from '../../../server/wca-api'

interface Props {
    history: History
}

export default function RoleSelect({ history }: Props): React.ReactElement {
    const [competitionId, setCompId] = useState('')

    const goToAdminPage = (path: string): void => {
        history.push(`/admin/${path}`)
    }

    const clearCompId = () => {
        window.localStorage.removeItem('competitionId')
        history.push(`/admin`)
    }

    if (window.localStorage.getItem('competitionId') === null) {
        history.push('/admin')
    } else if (!competitionId) {
        setCompId(window.localStorage.getItem('competitionId') || '')
    }
    if (competitionId)
        getWcifPublic(competitionId).then(results => console.log(results))

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant='h4' align='left'>
                This is {competitionId}
            </Typography>
            <Typography variant='h6' align='left'>
                Please select your role below
            </Typography>
            <Button
                variant='contained'
                style={{ marginRight: '5px' }}
                color='primary'
                onClick={() => goToAdminPage('judge')}
            >
                Judge
            </Button>
            <Button
                variant='contained'
                style={{ marginRight: '5px' }}
                color='primary'
                onClick={() => goToAdminPage('scramble')}
            >
                Scrambler
            </Button>
            <Button
                variant='contained'
                style={{ marginRight: '5px' }}
                color='primary'
                onClick={() => goToAdminPage('organizer')}
            >
                Organizer
            </Button>
            <Button
                variant='contained'
                style={{ marginRight: '5px' }}
                color='primary'
                onClick={() => goToAdminPage('delegate')}
            >
                Delegate
            </Button>
            <br></br>
            <Button variant='contained' color='secondary' onClick={clearCompId}>
                Clear Device Storage
            </Button>
        </Container>
    )
}

import React, { useState, useEffect } from 'react'
import {
    Button,
    Typography,
    CircularProgress,
    Container
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { signIn, signOut, isSignedIn } from '../../server/auth'
import { getMe } from '../../server/wca-api'
import CompetitionList from './CompetitionList'
import { History } from 'history'

interface Props {
    history: History
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            marginTop: theme.spacing(2)
        },
        floatLeft: {
            float: 'left'
        },
        floatRight: {
            float: 'right'
        }
    })
)

export default function Admin({ history }: Props): React.ReactElement {
    const classes = useStyles()
    let [userRequest, setUserRequest] = useState({
        userInfo: undefined,
        gotUserInfo: false
    })

    useEffect(() => {
        if (isSignedIn())
            getMe().then(user => {
                console.log(user.me)
                setUserRequest({
                    userInfo: user.me,
                    gotUserInfo: true
                })
            })
    }, [])

    const handleLogOut = () => {
        signOut()
        setUserRequest({ userInfo: undefined, gotUserInfo: false })
    }

    if (window.localStorage.getItem('competitionId') !== null) {
        history.push('/admin/role')
    }

    if (isSignedIn() && !userRequest.gotUserInfo) return <CircularProgress />
    else {
        const myInfo = userRequest.userInfo || { name: 'Waiting to get data' }
        return (
            <Container maxWidth='md'>
                {isSignedIn() ? (
                    <div className={classes.spacing}>
                        <div>
                            <Typography variant='h4' align='left'>
                                Hello, {myInfo.name}
                            </Typography>

                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleLogOut}
                            >
                                Sign Out
                            </Button>
                        </div>
                        <CompetitionList userInfo={myInfo} history={history} />
                    </div>
                ) : (
                    <div className={classes.spacing}>
                        <Typography variant='h4' align='left'>
                            Welcome Delegate
                        </Typography>
                        <Typography variant='body1' align='left'>
                            This device does not have a registered competiton.
                            Please sign in to register a compeition with this
                            device.
                        </Typography>
                        <Button
                            className={classes.spacing}
                            variant='contained'
                            color='primary'
                            onClick={signIn}
                        >
                            Sign in with the WCA
                        </Button>
                    </div>
                )}
            </Container>
        )
    }
}

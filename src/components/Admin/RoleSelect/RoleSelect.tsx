import React, { useState } from 'react'
import { Button, Typography, CircularProgress } from '@material-ui/core'
import { signIn, signOut, isSignedIn } from '../../../server/auth'
import { getMe } from '../../../server/wca-api'
import CompetitionList from './CompetitionList'

interface Props {}

export default function RoleSelect({}: Props): React.ReactElement {
    let [userRequest, setUserRequest] = useState({
        userInfo: undefined,
        gotUserInfo: false
    })
    const handleLogOut = () => {
        signOut()
        setUserRequest({ userInfo: undefined, gotUserInfo: false })
    }
    if (!userRequest.gotUserInfo && isSignedIn())
        getMe().then(user => {
            console.log(user.me)
            setUserRequest({
                userInfo: user.me,
                gotUserInfo: true
            })
        })
    if (isSignedIn() && !userRequest.gotUserInfo) return <CircularProgress />
    else {
        const myInfo = userRequest.userInfo || { name: 'Waiting to get data' }
        return (
            <div>
                {isSignedIn() ? (
                    <div>
                        <Typography variant='h4'>
                            Hello {myInfo.name}
                        </Typography>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleLogOut}
                        >
                            Sign Out
                        </Button>
                        <CompetitionList userInfo={myInfo} />
                    </div>
                ) : (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={signIn}
                    >
                        Sign in with the WCA
                    </Button>
                )}
            </div>
        )
    }
}

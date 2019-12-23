import React, { useEffect, useState } from 'react'
import { JudgeState } from '../types'
import { getUser } from '../../../../server/wca-api'
import {
	Fade,
	LinearProgress,
	Grid,
	Typography,
	Avatar,
	Button
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { User } from '../../../../types/wca'

interface Props {
	onComplete: (action: any) => void
	state: JudgeState
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(5),
			top: '50%'
		},
		avatar: {
			width: '30vmin',
			height: '30vmin'
		},
		button: {
			margin: theme.spacing(5),
			fontSize: '4vmin'
		}
	})
)

export default function ConfirmUser({
	onComplete,
	state
}: Props): React.ReactElement {
	const [user, setUser] = useState<null | User>(null)
	useEffect(() => {
		getUser(state.userId)
			.then(resp => {
				setUser(resp.user)
			})
			.catch(error => {
				onComplete({ type: 'BACK' })
			})
	}, [])
	const classes = useStyles()
	return (
		<>
			{user === null ? (
				<LinearProgress />
			) : (
				<Fade in={true}>
					<Grid
						className={classes.root}
						container
						justify='center'
						direction='column'
						alignItems='center'
					>
						{!user.avatar.is_default && (
							<Grid item>
								<Avatar
									className={classes.avatar}
									alt={user.name}
									variant='circle'
									src={user.avatar.url}
								/>
							</Grid>
						)}
						<Grid item>
							<Typography variant='h1'>{user.name}</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h2'>{user.wca_id}</Typography>
						</Grid>
						<Grid item>
							<Button
								className={classes.button}
								size='large'
								variant='outlined'
								color='primary'
								onClick={onComplete}
							>
								Confirm
							</Button>
							<Button
								className={classes.button}
								color='primary'
								size='large'
								variant='outlined'
								onClick={() => onComplete({ step: 0 })}
							>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</Fade>
			)}
		</>
	)
}

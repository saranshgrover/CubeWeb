import React, { useState } from 'react'
import { Typography, Grid, Fade, Button } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import SolveInputField from './SolveInputField'
import { validateInput } from '../../../../logic/judge'

interface Props {
	onComplete: (action: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
			height: '95vh',
			maxWidth: '100vw'
		}
	})
)

export default function InputTime({ onComplete }: Props): React.ReactElement {
	const [time, setTime] = useState(0)
	const [error, setError] = useState<null | string>(null)
	function handleComplete() {
		let validTime = validateInput(time)
		validTime[0]
			? onComplete({ time: validTime[1] })
			: setError(validTime[2])
	}
	const classes = useStyles()
	return (
		<Fade in={true}>
			<Grid
				container
				className={classes.root}
				alignItems='center'
				justify='center'
			>
				<Grid item>
					<SolveInputField
						time={time}
						onChange={(newTime: number) => setTime(newTime)}
					/>
				</Grid>
				<Grid item>
					<Button
						onClick={handleComplete}
						variant='contained'
						style={{ fontSize: '8vmin' }}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Fade>
	)
}

import React from 'react'
import { Typography, Grid, Fade } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

interface Props {
	onComplete: (action: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '95vh'
		},
		text: {
			fontSize: '20vmin',
			position: 'fixed' /* or absolute */,
			top: '50%',
			left: '50%',
			/* bring your own prefixes */
			transform: 'translate(-50%, -50%)'
		}
	})
)

export default function Begin({ onComplete }: Props): React.ReactElement {
	const classes = useStyles()
	console.log('begin')
	return (
		<Fade in={true}>
			<Grid
				className={classes.root}
				container
				direction='column'
				justify='center'
				alignItems='center'
				onClick={onComplete}
			>
				<Grid item>
					<Typography
						variant='h1'
						className={classes.text}
					>{`Tap Anywhere to Begin`}</Typography>
				</Grid>
			</Grid>
		</Fade>
	)
}

import React from 'react'
import {
	Typography,
	Grid,
	Button,
	Fade,
	Dialog,
	DialogTitle,
	DialogActions,
	TextField,
	DialogContent
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import QrReader from 'react-qr-reader'
import { parseScan } from '../../../../logic/judge'

interface Props {
	onComplete: (action: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
			height: '95vh',
			maxWidth: '100vw'
		},
		qr: {
			maxWidth: '65vmin',
			width: '65vmin'
		},
		text: {
			fontSize: '20vmin'
		}
	})
)

export default function Scan({ onComplete }: Props): React.ReactElement {
	const classes = useStyles()
	const handleScan = (data: string | null) => {
		if (data != null) {
			const user = parseScan(data)
			isNaN(user)
				? setError('Invalid Scan. Try again')
				: onComplete({ user: parseScan(data) })
		}
	}
	const [error, setError] = React.useState<null | string>(null)
	const [manual, setManual] = React.useState<null | number>(null)
	console.log('scan')
	return (
		<>
			<Dialog
				open={manual !== null}
				onClose={() => onComplete({ user: manual })}
			>
				<DialogTitle>User Input</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						type='number'
						value={manual}
						onChange={e => setManual(parseInt(e.target.value))}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onComplete({ user: manual })}>
						Done
					</Button>
				</DialogActions>
			</Dialog>
			<Fade in={true}>
				<Grid
					container
					direction='row'
					className={classes.root}
					alignItems='center'
					justify='center'
				>
					<Grid item>
						<div className={classes.qr}>
							<QrReader
								facingMode='user'
								delay={300}
								onError={() => {}}
								onScan={handleScan}
							/>
						</div>
					</Grid>
					<Grid item style={{ padding: '8vmin' }}>
						<Typography
							className={classes.text}
							variant='h1'
						>{`Scan`}</Typography>
						<Button
							onClick={() => setManual(0)}
							variant='outlined'
							size='large'
							color='primary'
						>
							Enter Manually Instead
						</Button>
						{error && (
							<Typography variant='h5' color='error'>
								{error}
							</Typography>
						)}
					</Grid>
				</Grid>
			</Fade>
		</>
	)
}

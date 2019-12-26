import React, { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
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

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
			height: '95vh',
			maxWidth: '100vw'
		}
	})
)

interface Props {
	onComplete: (action: any) => void
}
export default function SignCompetitor({
	onComplete
}: Props): React.ReactElement {
	const canvasRef = useRef()
	const classes = useStyles()
	function handleComplete() {
		// hacky workaround. TODO: Check if canvas ref has @types, else define it
		const ref: any = canvasRef
		console.log(ref)
		// no databse for now - so I'm just console.logging the output
		console.log(ref.current.getTrimmedCanvas().toDataURL('image/png'))
		onComplete({})
	}
	return (
		<Fade in={true}>
			<Grid
				spacing={2}
				container
				direction='column'
				className={classes.root}
				alignItems='center'
				justify='center'
			>
				<Grid item>
					<Typography style={{ color: 'white' }} variant='h2'>
						Competitor Signature
					</Typography>
				</Grid>
				<Grid item>
					<SignatureCanvas
						ref={canvasRef}
						backgroundColor='white'
						penColor='black'
						canvasProps={{
							style: { width: '75vw', height: '55vh' }
						}}
					/>
				</Grid>
				<Grid item>
					<Button
						onClick={handleComplete}
						variant='contained'
						style={{ fontSize: '4vmin' }}
					>
						Confirm Signature
					</Button>
				</Grid>
			</Grid>
		</Fade>
	)
}

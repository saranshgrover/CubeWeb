import React, { useState, useEffect } from 'react'
import { Typography, Grid, Fade } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

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
		text: {
			fontSize: '50vmin'
		}
	})
)

var percentColors = [
	{ pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
	{ pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
	{ pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }
]

var getColorForPercentage = function(pct: any) {
	for (var i = 1; i < percentColors.length - 1; i++) {
		if (pct < percentColors[i].pct) {
			break
		}
	}
	var lower = percentColors[i - 1]
	var upper = percentColors[i]
	var range = upper.pct - lower.pct
	var rangePct = (pct - lower.pct) / range
	var pctLower = 1 - rangePct
	var pctUpper = rangePct
	var color = {
		r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
		g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
		b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	}
	return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
	// or output as hex if preferred
}

export default function Inspection({ onComplete }: Props): React.ReactElement {
	const [time, setTime] = useState<number>(15.0)
	const [penalty, setPenalty] = useState<'+2' | 'DNF' | null>(null)
	useEffect(() => {
		const interval = setInterval(() => {
			if (time.toFixed() === '0') {
				setPenalty('+2')
				setTime(18)
			}
			time.toFixed() === '16'
				? setPenalty('DNF')
				: setTime(time => time - 0.1)
		}, 100)
		return () => {
			clearInterval(interval)
		}
	})
	function handleComplete() {
		let newPenalty = penalty === '+2' ? 2 : penalty === 'DNF' ? -1 : 0
		onComplete({ penalty: newPenalty })
	}
	const classes = useStyles()
	return (
		<Fade in={true}>
			<Grid
				onClick={handleComplete}
				container
				className={classes.root}
				alignItems='center'
				justify='center'
			>
				<Grid item>
					<Typography
						variant='h1'
						style={{
							color: getColorForPercentage(
								penalty ? 0 : time / 15
							)
						}}
						className={classes.text}
					>
						{penalty ? penalty : time.toFixed(1)}
					</Typography>
				</Grid>
			</Grid>
		</Fade>
	)
}

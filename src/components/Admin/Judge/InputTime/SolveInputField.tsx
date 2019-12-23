import React, { ReactElement } from 'react'
import { InputBase } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

interface Props {
	time: number
	onChange: (newTime: number) => any
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			fontSize: '30vmin',
			fontWeight: 'lighter',
			color: 'white',
			border: '2px solid white',
			width: '90vw',
			height: '35vh',
			textAlign: 'center'
		}
	})
)

export default function SolveInputField({
	time,
	onChange
}: Props): ReactElement {
	function numToVal() {
		let strTime = time.toString()
		let len = strTime.length
		if (len >= 3) {
			strTime = strTime.slice(0, -3) + '.' + strTime.slice(-3)
		}
		if (len >= 6) {
			strTime = strTime.slice(0, -6) + ':' + strTime.slice(-6)
		}
		return strTime
	}
	function handleChange(
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		let newTime: string | number = e.target.value.replace(':', '')
		newTime = newTime.replace('.', '')
		newTime = newTime === '' ? 0 : parseInt(newTime)
		if (!isNaN(newTime) && newTime <= 1000000) {
			onChange(newTime)
		}
	}
	const classes = useStyles()
	return (
		<InputBase
			className={classes.input}
			autoFocus={true}
			value={numToVal()}
			onChange={handleChange}
		/>
	)
}

import React, { useState, useReducer } from 'react'
import { Steps, JudgeState, Action } from './types'
import { MobileStepper, Button, Grid } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Begin from './Begin/Begin'
import Scan from './Scan/Scan'
import ConfirmUser from './ConfirmUser/ConfirmUser'
import ConfirmReady from './ConfirmReady/ConfirmReady'
import Inspection from './Inspection/Inspection'
import InputTime from './InputTime/InputTime'
import SignatureJudge from './Signature/SignatureJudge'
import SignatureCompetitor from './Signature/SignatureCompetitor'
import Complete from './Complete/Complete'

const steps = [
	'Begin',
	'Scan QR Code',
	'Confirm Competitor',
	'Confirm Competitor is Ready',
	'Begin Inspection',
	'Begin Attempt',
	'Enter Time',
	'Judge Signature',
	'Competitor Signature',
	'Complete'
]

const initialState: JudgeState = {
	time: 0,
	userId: -1,
	activityId: undefined,
	step: Steps.Begin,
	penalty: 0
}

function judgeReducer(state: JudgeState, action: Action) {
	switch (action.type) {
		case 'BACK': {
			return {
				...state,
				step: action.step ? action.step : Math.min(state.step - 1, 0)
			}
		}
		case Steps.InputTime: {
			return {
				...state,
				step: Steps.SignJudge,
				time: action.time ? action.time : 0
			}
		}
		case Steps.Inspection: {
			let newPenalty = state.penalty
			if (action.penalty !== undefined) {
				newPenalty =
					state.penalty < 0
						? state.penalty
						: action.penalty < 0
						? action.penalty
						: state.penalty + action.penalty
			}
			return {
				...state,
				penalty: newPenalty,
				step: Steps.InputTime
			}
		}
		default: {
			return {
				...state,
				step:
					action.step === undefined
						? Math.min(state.step + 1, 8)
						: action.step,
				userId: action.user === undefined ? state.userId : action.user
			}
		}
	}
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '100vh',
			width: '100vw'
		},
		stepper: {
			height: '5vh'
		},
		content: {
			height: '95vh',
			width: '100vw'
		}
	})
)
var percentColors = [
	{ pct: 0.0, color: { r: 0xdc, g: 0xdc, b: 0xdc } },
	{ pct: 0.5, color: { r: 0xa9, g: 0xa9, b: 0xa9 } },
	{ pct: 1.0, color: { r: 0, g: 0, b: 0 } }
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
export default function Judge(): React.ReactElement {
	const [state, dispatch] = useReducer(judgeReducer, initialState)
	const handleComplete = (action: any) => {
		dispatch({ type: Math.max(state.step + 1, 8), ...action })
	}
	const getStep = () => {
		switch (state.step) {
			case Steps.Begin:
				return <Begin onComplete={handleComplete} />
			case Steps.Scan:
				return <Scan onComplete={handleComplete} />
			case Steps.ConfirmUser:
				return <ConfirmUser state={state} onComplete={handleComplete} />
			case Steps.ConfirmReady:
				return <ConfirmReady onComplete={handleComplete} />
			case Steps.Inspection:
				return <Inspection onComplete={handleComplete} />
			case Steps.InputTime:
				return <InputTime onComplete={handleComplete} />
			case Steps.SignJudge:
				return <SignatureJudge />
			case Steps.SignCompetitor:
				return <SignatureCompetitor />
			case Steps.Complete:
				return <Complete />
		}
	}
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<div className={classes.stepper}>
				<MobileStepper
					steps={steps.length}
					backButton={
						<Button
							onClick={() =>
								dispatch({
									type: 'BACK',
									step: Math.max(0, state.step - 1)
								})
							}
						>
							Back
						</Button>
					}
					nextButton={<Button>Incident</Button>}
					position={'top'}
					activeStep={state.step}
				>
					{/* {steps.map((label: string, index: number) => {
					return (
						<Step key={index}>
							<StepLabel>{label}</StepLabel>
						</Step>
					)
				})} */}
				</MobileStepper>
			</div>
			<div
				className={classes.content}
				style={{
					backgroundColor: getColorForPercentage((state.step + 1) / 8)
				}}
			>
				{getStep()}
			</div>
		</div>
	)
}

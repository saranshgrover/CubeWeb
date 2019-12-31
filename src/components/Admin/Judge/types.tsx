export enum Steps {
	Begin,
	Scan,
	ConfirmUser,
	ConfirmReady,
	Inspection,
	InputTime,
	SignJudge,
	SignCompetitor,
	Complete,
	__LENGTH
}

export type JudgeState = {
	userId: number
	time: number
	activityId: string | undefined
	step: Steps
	penalty: number // 0 (no penalty) | non-negative int (added to time) | -1 (DNF) | -2 (DNS)
}

export type Action = {
	type: Steps | 'ERROR' | 'BACK'
	time?: number
	user?: number
	solve?: number
	step?: Steps
	penalty?: number
}

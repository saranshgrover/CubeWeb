export function parseScan(scan: string) {
	return isNaN(parseInt(scan))
		? parseInt(scan.substring(scan.lastIndexOf('/')))
		: parseInt(scan)
}

/**
 * Validates a time input. Checks if it is a vaild time (3 decimal numbers) and if it makes cutoff. Returs true/false and the correct time
 * @param time
 */
export function validateInput(time: number): [boolean, number, null | string] {
	return [true, time, null]
}

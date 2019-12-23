export function parseScan(scan: string) {
	return isNaN(parseInt(scan))
		? parseInt(scan.substring(scan.lastIndexOf('/')))
		: parseInt(scan)
}

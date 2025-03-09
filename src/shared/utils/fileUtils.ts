const K_UNIT = 1024
const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
const GB = K_UNIT * K_UNIT * K_UNIT
const MB = K_UNIT * K_UNIT
const KB = K_UNIT

export const fileUtils = {
	byteConverter: (
		bytes: number,
		decimals: number = 2,
		unit?: 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB'
	): string => {
		if (bytes < 0) {
			throw new Error("Bytes value cannot be negative.")
		}

		if (bytes === 0) return "0 Bytes"

		if (unit) {
			const unitIndex = SIZES.indexOf(unit)
			if (unitIndex === -1) {
				throw new Error(`Invalid unit: ${unit}. Valid units are ${SIZES.join(", ")}.`)
			}
			const converted = bytes / Math.pow(K_UNIT, unitIndex)
			const displayUnit = unit === "Bytes" && converted !== 1 ? "Bytes" : unit
			return `${converted.toFixed(decimals)} ${displayUnit}`
		}

		const i = Math.floor(Math.log(bytes) / Math.log(K_UNIT))
		const size = SIZES[i] || SIZES[SIZES.length - 1]
		const converted = bytes / Math.pow(K_UNIT, i)
		const displaySize = size === "Bytes" && converted !== 1 ? "Bytes" : size
		return `${converted.toFixed(decimals)} ${displaySize}`
	},
	GB,
	MB,
	KB
}

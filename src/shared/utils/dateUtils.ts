
export const dateUtils = {
	format: (date: Date, showHours?: boolean) => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const zonedDate = new Date(date.toLocaleString('en-US', {timeZone}));

		const day = zonedDate.getDate().toString().padStart(2, '0');
		const month = (zonedDate.getMonth() + 1).toString().padStart(2, '0');
		const year = zonedDate.getFullYear();

		let formattedDate = `${day}.${month}.${year}`;

		if (showHours) {
			const hours = zonedDate.getHours().toString().padStart(2, '0');
			const minutes = zonedDate.getMinutes().toString().padStart(2, '0');
			formattedDate += ` ${hours}:${minutes}`;
		}

		return formattedDate;
	},

	formatTimeToMinutesOnly: (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}
}
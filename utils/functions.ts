function formatDate(inputDateString: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const inputDate = new Date(inputDateString);
	const formattedDate = inputDate.toLocaleDateString("en-US", options);

	return formattedDate;
}

function estimateReadingTime(
	text: string,
	wordsPerMinute: number = 200
): number {
	// Calculate the number of words in the text
	const wordCount = text.split(/\s+/).length;

	// Calculate the reading time in minutes
	const readingTimeMinutes = wordCount / wordsPerMinute;

	// Round up to the nearest minute
	const roundedReadingTime = Math.ceil(readingTimeMinutes);

	return roundedReadingTime;
}

export { formatDate, estimateReadingTime };

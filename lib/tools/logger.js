let start = null;

function formatElapsedTime(ms) {
	const milliseconds = Math.floor(ms % 1000);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms  / 1000 / 3600 ) % 24)

  const humanized = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(':');

  return `${humanized}.${milliseconds.toString().padStart(4, "0")}`;
}

function setStart() {
	start = Date.now();
}

function getElapsedTimeInMs() {
	return Date.now() - start;
}

function getElapsedTimeFormatted() {
	return formatElapsedTime(getElapsedTimeInMs());
}

function logWithElapsedTime(logFunction, message) {
	if (start === null) setStart();

	logFunction(`[${getElapsedTimeFormatted()}] ${message}`);
}

function logInfo(message) {
	logWithElapsedTime(console.info, message);
}

function logError(error) {
	logWithElapsedTime(console.error, error);
}

function logWarning(warningMessage) {
	logWithElapsedTime(console.warn, warningMessage);
}

export { setStart, logInfo, logError, logWarning }
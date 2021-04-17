import { execFile } from "child_process";
import cgs from "./codeGenSettings.js";
import fileIo from "./fileIo.js";
import { logInfo, logError } from "./logger.js";

function getFormatFilesInDirectoryScriptPath() {
	return fileIo.path.resolve(process.cwd(), "./tools/formatting/formatFilesInDirectory.sh");
}

function formatFilesInOutputDirectory() {
	logInfo("Starting WebStorm to format files in output directory ...");
	const child = execFile(getFormatFilesInDirectoryScriptPath(),[cgs.getOutputDirectory()]);
	child.stdout.on("data", chunk => logInfo(chunk));
	child.stdout.on("error", err => logError(`Something went wrong while formating files: ${err.message}\nError name:${err.name}\nStack trace:${err.stack}`));
	child.stdout.on("end", () => logInfo("Formatting finished."));
}

export {
	formatFilesInOutputDirectory
}

import { execFile } from "child_process";
import md from "./metadataSpec.js";
import fileIo from "./fileIo.js";

function getFormatFilesInDirectoryScriptPath() {
	return fileIo.path.resolve(process.cwd(), "./tools/formatting/formatFilesInDirectory.sh");
}

function formatFilesInOutputDirectory() {
	console.log("Starting WebStorm to format files in output directory ...");
	const child = execFile(getFormatFilesInDirectoryScriptPath(),[md.getOutputDirectory()]);
	child.stdout.on("data", chunk => console.log(chunk));
	child.stdout.on("error", err => console.error(`Something went wrong while formating files: ${err.message}\nError name:${err.name}\nStack trace:${err.stack}`));
	child.stdout.on("end", () => console.log("Formatting finished."));
}

export {
	formatFilesInOutputDirectory
}

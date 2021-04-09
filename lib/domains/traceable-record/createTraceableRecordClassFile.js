import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateTraceableRecordClass, getTraceableRecordClassName } from "./generateTraceableRecordClass.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getTraceableRecordClassFileContent() {
	return generateTraceableRecordClass(sObjectSpec.apiName).sourceCode;
}

function getTraceableRecordClassDirectory() {
	return cgs.getDomainRootDirectory(sObjectSpec.apiName);
}

function getTraceableRecordClassFileName() {
	return `${getTraceableRecordClassName(sObjectSpec.apiName)}.cls`;
}

function getTraceableRecordClassFilePath() {
	return fileIo.path.join(getTraceableRecordClassDirectory(),getTraceableRecordClassFileName());
}

function createTraceableRecordClassFile(sObjectApiName) {
	setInternals(sObjectApiName);

	const fileContent = getTraceableRecordClassFileContent();
	const filePath = getTraceableRecordClassFilePath();

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

export { createTraceableRecordClassFile };
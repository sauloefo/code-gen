import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateTraceableRecordInterface, getTraceableRecordInterfaceName } from "./generateTraceableRecordInterface.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getTraceableRecordInterfaceFileContent() {
	return generateTraceableRecordInterface(sObjectSpec.apiName).sourceCode;
}

function getTraceableRecordInterfaceDirectory() {
	return cgs.getDomainRootDirectory(sObjectSpec.apiName);
}

function getTraceableRecordInterfaceFileName() {
	return `${getTraceableRecordInterfaceName(sObjectSpec.apiName)}.cls`;
}

function getTraceableRecordInterfaceFilePath() {
	return fileIo.path.join(getTraceableRecordInterfaceDirectory(),getTraceableRecordInterfaceFileName());
}

function createTraceableRecordInterfaceFile(sObjectApiName) {
	setInternals(sObjectApiName);

	const fileContent = getTraceableRecordInterfaceFileContent();
	const filePath = getTraceableRecordInterfaceFilePath();

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

export { createTraceableRecordInterfaceFile };
import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateDomainInterface } from "./generateDomainInterface.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getDomainInterfaceFileName() {
	return `${cgs.getDomainInterfaceName(sObjectSpec.apiName)}.cls`;
}

function getDomainInterfaceDirectory() {
	return cgs.getDomainRootDirectory(sObjectSpec.apiName);
}

function getDomainInterfaceFilePath() {
	const { apiName } = sObjectSpec;
	return fileIo.path.join(getDomainInterfaceDirectory(apiName),getDomainInterfaceFileName(apiName));
}

function getDomainInterfaceFileContent() {
	return generateDomainInterface(sObjectSpec.apiName).sourceCode;
}

function createDomainInterfaceFile(sObjectApiName) {
	setInternals(sObjectApiName);

	const fileContent = getDomainInterfaceFileContent();
	const filePath = getDomainInterfaceFilePath();

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

export { createDomainInterfaceFile };
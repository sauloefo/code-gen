export { createDomainBaseClassFile };

function createDomainBaseClassFile(sObjectApiName) {
	setInternals(sObjectApiName);

	const fileContent = getDomainBaseClassFileContent();
	const filePath = getDomainBaseClassFilePath();

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateDomainBaseClass } from "./generateDomainBaseClass.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getDomainBaseClassFileName() {
	return `${cgs.getDomainBaseClassName(sObjectSpec.apiName)}.cls`;
}

function getDomainBaseClassDirectory() {
	return cgs.getDomainRootDirectory(sObjectSpec.apiName);
}

function getDomainBaseClassFilePath() {
	const { apiName } = sObjectSpec;
	return fileIo.path.join(getDomainBaseClassDirectory(apiName),getDomainBaseClassFileName(apiName));
}

function getDomainBaseClassFileContent() {
	return generateDomainBaseClass(sObjectSpec.apiName).sourceCode;
}
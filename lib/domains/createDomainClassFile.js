export { createDomainClassFile };

function createDomainClassFile(sObjectApiName) {
	setInternals(sObjectApiName);

	const fileContent = getDomainClassFileContent();
	const filePath = getDomainClassFilePath();

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

import fileIo from "../tools/fileIo.js";
import cgs from "../tools/codeGenSettings.js";
import { generateDomainClass } from "./generateDomainClass.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getDomainClassFileName() {
	return `${cgs.getDomainClassName(sObjectSpec.apiName)}.cls`;
}

function getDomainClassDirectory() {
	return cgs.getDomainRootDirectory(sObjectSpec.apiName);
}

function getDomainClassFilePath() {
	const { apiName } = sObjectSpec;
	return fileIo.path.join(getDomainClassDirectory(apiName),getDomainClassFileName(apiName));
}

function getDomainClassFileContent() {
	return generateDomainClass(sObjectSpec.apiName).sourceCode;
}
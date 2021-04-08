import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import {generateDomainAccessorsClass} from "./generateDomainAccessorsClass.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getDomainAccessorsClassFileName() {
	return `${cgs.getDomainAccessorsClassName(sObjectSpec.apiName)}.cls`;
}

function getDomainAccessorsClassFileDirectory() {
	return fileIo.path.joinAndNormalize(cgs.getOutputDirectory(),sObjectSpec.pluralName, "Domain");
}

function getDomainAccessorsClassFilePath() {
	const sObjectApiName = sObjectSpec.apiName;
	return fileIo.path.join(getDomainAccessorsClassFileDirectory(sObjectApiName),getDomainAccessorsClassFileName(sObjectApiName));
}

function getDomainAccessorsClassFileContent() {
	return generateDomainAccessorsClass(sObjectSpec.apiName).sourceCode;
}

function createDomainAccessorsClassFile(sObjectApiName) {
	setInternals(sObjectApiName);

	const fileContent = getDomainAccessorsClassFileContent();
	const filePath = getDomainAccessorsClassFilePath(sObjectApiName);

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

export { createDomainAccessorsClassFile };
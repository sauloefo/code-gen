import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import generateDomainAccessorsClassFileContent from "./generateDomainAccessorsClassFileContent.js";

function getDomainAccessorsClassFileName(sObjectApiName) {
	return `${cgs.getDomainAccessorsClassName(sObjectApiName)}.cls`;
}

function getDomainAccessorsClassFileDirectory(sObjectApiName) {
	const sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
	return fileIo.path.joinAndNormalize(cgs.getOutputDirectory(),sObjectSpec.sObjectPluralName, "Domain");
}

function getDomainAccessorsClassFilePath(sObjectApiName) {
	return fileIo.path.join(getDomainAccessorsClassFileDirectory(sObjectApiName),getDomainAccessorsClassFileName(sObjectApiName));
}

function generateDomainAccessorsClassFile(sObjectApiName) {
	const fileContent = generateDomainAccessorsClassFileContent(sObjectApiName);
	const filePath = getDomainAccessorsClassFilePath(sObjectApiName);

	fileIo.fs.createOrOverwriteFile(filePath, fileContent);
}

export default generateDomainAccessorsClassFile;
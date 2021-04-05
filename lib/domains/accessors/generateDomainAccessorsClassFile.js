import fileIo from "../../tools/fileIo.js";
import md from "../../tools/metadataSpec.js";
import generateDomainAccessorsClassFileContent from "./generateDomainAccessorsClassFileContent.js";

function getDomainAccessorsClassFileName(sObjectApiName) {
	return `${md.getDomainAccessorsClassName(sObjectApiName)}.cls`;
}

function getDomainAccessorsClassFileDirectory(sObjectApiName) {
	const sObjectSpec = md.selectSObjectSpec(sObjectApiName);
	return fileIo.path.joinAndNormalize(md.getOutputDirectory(),sObjectSpec.sObjectPluralName, "Domain");
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
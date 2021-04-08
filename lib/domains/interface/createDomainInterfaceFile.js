import fileIo from "../../tools/fileIo.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateDomainInterface } from "./generateDomainInterface.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getDomainInterfaceName() {
	return `${cgs.getDomainInterfaceName(sObjectSpec.apiName)}.cls`;
}

function getDomainInterfaceDirectory() {
	return fileIo.path.joinAndNormalize(cgs.getOutputDirectory(),sObjectSpec.pluralName, "Domain");
}

function getDomainInterfaceFilePath() {
	const { apiName } = sObjectSpec;
	return fileIo.path.join(getDomainInterfaceDirectory(apiName),getDomainInterfaceName(apiName));
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

export default createDomainInterfaceFile;
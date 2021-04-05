import fileIo from "./fileIo.js";
import upperCaseFirstLetter from "./upperCaseFirstLetter.js";

let settings;

function getDomainAccessorsClassName(sObjectApiName) {
	const sObjectSpec = selectSObjectSpec(sObjectApiName);
	return `${upperCaseFirstLetter(sObjectSpec.sObjectPluralName)}Accessors`;
}

function getOutputDirectory() {
	return fileIo.path.resolve(process.cwd(),settings.outputDirectory);
}

function loadFromFile(filePath) {
	const fileContent = fileIo.fs.readFileSync(filePath, "utf8");
	const loadedSettings = JSON.parse(fileContent);
	setSettings(loadedSettings);
}

function selectFieldSpecByApiName(sObjectApiName, fieldApiName) {
	return selectSObjectSpec(sObjectApiName)
			.fieldSpecs.find(fieldSpec => fieldSpec.apiName === fieldApiName);
}

function selectFieldSpecByFieldType(sObjectApiName, fieldType) {
	return selectSObjectSpec(sObjectApiName)
			.fieldSpecs.filter(fieldSpec => fieldSpec.fieldType === fieldType);
}

function selectSObjectSpec(sObjectApiName) {
	return settings.sObjectSpecs.find(sObjectSpec => sObjectSpec.apiName === sObjectApiName);
}

function setSettings(newSettings) {
	settings = newSettings;
}

export default {
	getDomainAccessorsClassName,
	getOutputDirectory,
	loadFromFile,
	selectFieldSpecByApiName,
	selectFieldSpecByFieldType,
	selectSObjectSpec,
	setSettings
}
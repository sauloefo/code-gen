import fileIo from "./fileIo.js";
import stringTools from "./stringTools.js";

let settings;

function getSettings() {
	if (settings) return settings;

	throw Error("CodeGen settings has not been set.\nCall setSettings(newSettings) or loadFromFile(filePath) before use any other function from codeGenSettings.js");
}

function getDomainAccessorsClassName(sObjectApiName) {
	const sObjectSpec = selectSObjectSpec(sObjectApiName);
	return `${stringTools.upperCaseFirstLetter(sObjectSpec.sObjectPluralName)}Accessors`;
}

function getDomainInterfaceName(sObjectApiName) {
	const sObjectSpec = selectSObjectSpec(sObjectApiName);
	return `I${stringTools.upperCaseFirstLetter(sObjectSpec.sObjectPluralName)}`; 
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
	const fieldSpec = selectSObjectSpec(sObjectApiName)
			.fieldSpecs.find(fieldSpec => fieldSpec.apiName === fieldApiName);
	
	if (fieldSpec) return fieldSpec;

	throw Error(`There is no fieldSpec with apiName equal to "${fieldApiName}" for a SObject with apiName equal to "${sObjectApiName}".`);
}

function selectFieldSpecByFieldType(sObjectApiName, fieldType) {
	return selectSObjectSpec(sObjectApiName)
			.fieldSpecs.filter(fieldSpec => fieldSpec.fieldType === fieldType);
}

function selectSObjectSpec(sObjectApiName) {
	const sObjectSpec = getSettings().sObjectSpecs.find(sObjectSpec => sObjectSpec.apiName === sObjectApiName);
	if (sObjectSpec) return sObjectSpec;

	throw Error(`There is no sObjectSpec for a SObject with apiName equal to "${sObjectApiName}".`);
}

function setSettings(newSettings) {
	settings = newSettings;
}

export default {
	getDomainAccessorsClassName,
	getDomainInterfaceName,
	getOutputDirectory,
	loadFromFile,
	selectFieldSpecByApiName,
	selectFieldSpecByFieldType,
	selectSObjectSpec,
	setSettings
}
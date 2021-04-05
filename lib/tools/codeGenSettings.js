import sfdc from "./sfdcMetadata.js";
import fileIo from "./fileIo.js";
import upperCaseFirstLetter from "./upperCaseFirstLetter.js";

const settings = {
	outputDirectory: "output",
	sObjectSpecs: [
		{
			apiName: "Case",
			sObjectPluralName: "cases",	
			fieldSpecs: [
				{
					apiName: "Id", 
					fieldType: sfdc.fieldTypes.Id,
					fieldPluralName: "ids",
				}
			]
		}
	]
};

function getDomainAccessorsClassName(sObjectApiName) {
	const sObjectSpec = selectSObjectSpec(sObjectApiName);
	return `${upperCaseFirstLetter(sObjectSpec.sObjectPluralName)}Accessors`;
}

function getOutputDirectory() {
	return fileIo.path.resolve(process.cwd(),settings.outputDirectory);
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

export default {
	getDomainAccessorsClassName,
	getOutputDirectory,
	selectFieldSpecByApiName,
	selectFieldSpecByFieldType,
	selectSObjectSpec
}
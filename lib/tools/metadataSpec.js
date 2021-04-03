import sfdc from "./sfdcMetadata.js";

const metadataSpec = {
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

function selectFieldSpecByApiName(sObjectApiName, fieldApiName) {
	return selectSObjectSpec(sObjectApiName)
			.fieldSpecs.find(fieldSpec => fieldSpec.apiName === fieldApiName);
}

function selectFieldSpecByFieldType(sObjectApiName, fieldType) {
	return selectSObjectSpec(sObjectApiName)
			.fieldSpecs.filter(fieldSpec => fieldSpec.fieldType === fieldType);
}

function selectSObjectSpec(sObjectApiName) {
	return metadataSpec.sObjectSpecs.find(sObjectSpec => sObjectSpec.apiName === sObjectApiName);
}

export default {
	selectFieldSpecByApiName,
	selectFieldSpecByFieldType,
	selectSObjectSpec
}
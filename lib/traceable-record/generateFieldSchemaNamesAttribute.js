export {
	generateFieldSchemaNamesAttribute,
	getNameOfFieldSchemaNamesAttribute
}

function generateFieldSchemaNamesAttribute(sObjectApiName) {
	setInternals(sObjectApiName);

	const name = getNameOfFieldSchemaNamesAttribute();
	const sourceCode = getSourceCode();
	
	return {
		name,
		sourceCode
	};
}

function 	getNameOfFieldSchemaNamesAttribute() {
	return `fields`;
}

import cgs from "../tools/codeGenSettings.js";
import stringTools from "../tools/stringTools.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getSourceCode() {
	const attributeName = getNameOfFieldSchemaNamesAttribute();
	const fieldNames = getFieldNames();

	const statements = [
		`List<Schema.SObjectField> ${attributeName} = new List<Schema.SObjectField>{`,
		fieldNames,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}

function getFieldNames() {
	const statements = sObjectSpec.fieldSpecs.map(
		fieldSpec => cgs.getSchemaFieldName(sObjectSpec.apiName,fieldSpec.apiName)
	);

	return statements.join(",\n");
}
export {
	generateFieldHasValueMethod,
	generateFieldHasValueMethodHeader,
	getNameOfFieldHasValueMethod
}

function generateFieldHasValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const name = getMethodName();
	const sourceCode = getSourceCode();

	return {
		name,
		type: cgs.fragmentTypes.fieldHasValueForTraceableRecordMethod,
		sourceCode
	}
}

function generateFieldHasValueMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.fieldHasValueForTraceableRecordMethodHeader,
		sourceCode
	}
}

function getNameOfFieldHasValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	return getMethodName();
}

import cgs from "../tools/codeGenSettings.js";
import stringTools from "../tools/stringTools.js";
import sfdc from "../tools/sfdcMetadata.js";

let args, sObjectSpec, fieldSpec;

function setInternals(sObjectApiName, fieldApiName) {
	args = {
		fieldApiName,
		sObjectApiName
	};
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
	fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiName, fieldApiName);
}

function getMethodHeader() {
	const returnType = getReturnType();
	const methodName = getMethodName();

	return `${returnType} ${methodName}()`;
}

function getReturnType() {
	return sfdc.apexDataTypes.Boolean;
}

function getMethodName() {
	const singularName = stringTools.upperCaseFirstLetter(fieldSpec.singularName);
	
	return `has${singularName}`;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const fieldSchemaName = getSchemaFieldName();
	
	const statements = [
		`public ${methodHeader} {`,
		`  return hasValue(${fieldSchemaName});`,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}
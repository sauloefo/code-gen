export { 
	generateFieldHadValueMethod,
	generateFieldHadValueMethodHeader,
	getNameOfFieldHadValueMethod
}

function generateFieldHadValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const name = getMethodName();
	const sourceCode = getSourceCode();

	return {
		name,
		type: cgs.fragmentTypes.fieldHasInitialValueForTraceableRecordMethod,
		sourceCode
	}
}

function generateFieldHadValueMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();
	
	return {
		name,
		type: cgs.fragmentTypes.fieldHasInitialValueForTraceableRecordMethodHeader,
		sourceCode
	}
}

function getNameOfFieldHadValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	return getMethodName();
}

import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";
import sfdc from "../../tools/sfdcMetadata.js";

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
	
	return `had${singularName}`;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const fieldSchemaName = getSchemaFieldName();
	
	const statements = [
		`public ${methodHeader} {`,
		`  return hadValue(${fieldSchemaName});`,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}
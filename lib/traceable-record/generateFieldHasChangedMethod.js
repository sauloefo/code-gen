export { 
	generateFieldHasChangedMethod,
	generateFieldHasChangedMethodHeader,
	getNameOfFieldHasChangedMethod
}

function generateFieldHasChangedMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const name = getMethodName();
	const sourceCode = getSourceCode();

	return {
		name,
		type: cgs.fragmentTypes.fieldHasChangedForTraceableRecordMethod,
		sourceCode
	}
}

function generateFieldHasChangedMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.fieldHasChangedForTraceableRecordMethodHeader,
		sourceCode
	}
}

function getNameOfFieldHasChangedMethod(sObjectApiName, fieldApiName) {
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
	const singularName = stringTools.lowerCaseFirstLetter(fieldSpec.singularName);
	
	return `${singularName}HasChanged`;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const fieldSchemaName = getSchemaFieldName();
	
	const statements = [
		`public ${methodHeader} {`,
		`  return fieldValueHasChanged(${fieldSchemaName});`,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}
export { 
	generateGetFieldValueMethod,
	generateGetFieldValueMethodHeader,
	getNameOfGetFieldValueMethod
}

function generateGetFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = getSourceCode();
	const methodName = getMethodName();
	
	return {
		name: methodName,
		type: cgs.fragmentTypes.fieldGetterForTraceableRecordMethod,
		sourceCode,
		relatedFieldApiName: fieldApiName
	}
}

function generateGetFieldValueMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.fieldGetterForTraceableRecordMethodHeader,
		sourceCode,
		relatedFieldApiName: fieldApiName
	}
}

function getMethodName() {
	const singularName = stringTools.upperCaseFirstLetter(fieldSpec.singularName);
	return `get${singularName}`;
}

import cgs from "../tools/codeGenSettings.js";
import stringTools from "../tools/stringTools.js";

let args, sObjectSpec, fieldSpec;

function setInternals(sObjectApiName, fieldApiName) {
	args = {
		fieldApiName,
		sObjectApiName
	};
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
	fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiName, fieldApiName);
}

function getNameOfGetFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	return getMethodName();
}

function getMethodHeader() {
	const returnType = getReturnType();
	const methodName = getMethodName();

	return `${returnType} ${methodName}()`;
}

function getReturnType() {
	return fieldSpec.dataType;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const returnType = getReturnType();
	const fieldSchemaName = getSchemaFieldName();

	const statements = [
		`public ${methodHeader} {`,
		`  return (${returnType})getFieldValue(${fieldSchemaName});`,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}
export { 
	generateGetOldFieldValueMethod,
	generateGetOldFieldValueMethodHeader,
	getNameOfGetOldFieldValueMethod
}

function generateGetOldFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	const sourceCode = getSourceCode();
	const name = getMethodName();

	return {
		name,
		type: cgs.fragmentTypes.fieldInitialGetterForTraceableRecordMethod,
		sourceCode
	}
}

function generateGetOldFieldValueMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.fieldInitialGetterForTraceableRecordMethodHeader,
		sourceCode
	}
}

function getNameOfGetOldFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	return getMethodName();
}

import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";

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
	return fieldSpec.dataType;
}

function getMethodName() {
	const singularName = stringTools.upperCaseFirstLetter(fieldSpec.singularName);
	return `getOld${singularName}`;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const returnType = getReturnType();
	const fieldSchemaName = getSchemaFieldName();

	return `public ${methodHeader} {return (${returnType})getOldFieldValue(${fieldSchemaName});}`;
}
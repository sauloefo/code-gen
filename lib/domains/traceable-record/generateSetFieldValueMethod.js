export { 
	generateSetFieldValueMethod,
	generateSetFieldValueMethodHeader,
	getNameOfSetFieldValueMethod
}

function generateSetFieldValueMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.fieldSetterForTraceableRecordMethodHeader,
		sourceCode,
		relatedFieldApiName: fieldApiName
	}
}

function getNameOfSetFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	return getMethodName();
}

function generateSetFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = getSourceCode();
	const name = getMethodName();

	return {
		name,
		type: cgs.fragmentTypes.fieldSetterForTraceableRecordMethod,
		sourceCode,
		relatedFieldApiName: fieldApiName
	}
}

import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";
import { getTraceableRecordInterfaceName } from "../traceable-record-interface/generateTraceableRecordInterface.js";

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

	const newValueArgumentType = getNewValueArgumentType();
	const newValueArgumentName = getNewValueArgumentName();

	return `${returnType} ${methodName}(${newValueArgumentType} ${newValueArgumentName})`;
}

function getNewValueArgumentType() {
	return fieldSpec.dataType;
}

function getNewValueArgumentName() {
	const singularName = stringTools.upperCaseFirstLetter(fieldSpec.singularName);
	return `new${singularName}`;
}

function getReturnType() {
	return getTraceableRecordInterfaceName(args.sObjectApiName);
}

function getMethodName() {
	const singularName = stringTools.upperCaseFirstLetter(fieldSpec.singularName);
	return `set${singularName}`;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const fieldSchemaName = getSchemaFieldName();
	const newValueArgumentName = getNewValueArgumentName();

	const statements = [
		`public ${methodHeader} {`,
		`  setFieldValue(${fieldSchemaName},${newValueArgumentName});`,
		'  return this;',
		'}'
	];

	return stringTools.convertToSourceCode(statements);
}
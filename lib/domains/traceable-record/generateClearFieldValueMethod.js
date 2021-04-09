export {
	generateClearFieldValueMethod,
	generateClearFieldValueMethodHeader,
	getNameOfClearFieldValueMethod
}

function generateClearFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = getSourceCode();
	const name = getMethodName();

	return {
		name,
		type: cgs.fragmentTypes.fieldCleanerForTraceableRecordMethod,
		sourceCode
	}
}

function generateClearFieldValueMethodHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.fieldCleanerForTraceableRecordMethodHeader,
		sourceCode
	}
}

function getNameOfClearFieldValueMethod(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);
	
	return getMethodName();
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

	return `${returnType} ${methodName}()`;
}

function getReturnType() {
	return getTraceableRecordInterfaceName(args.sObjectApiName);
}

function getMethodName() {
	const singularName = stringTools.upperCaseFirstLetter(fieldSpec.singularName);
	return `clear${singularName}`;
}

function getSchemaFieldName() {
	return cgs.getSchemaFieldName(args.sObjectApiName, args.fieldApiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const fieldSchemaName = getSchemaFieldName();

	const statements = [
		`public ${methodHeader} {`,
		`  setFieldValueToNull(${fieldSchemaName});`,
		'  return this;',
		'}'
	];

	return stringTools.convertToSourceCode(statements);
}
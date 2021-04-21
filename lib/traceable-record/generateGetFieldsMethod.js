export {
	generateGetFieldsMethod,
}

function generateGetFieldsMethod(sObjectApiName) {
	setInternals(sObjectApiName);

	const name = getMethodName();
	const sourceCode = getSourceCode();

	return {
		name,
		sourceCode
	}
}

import cgs from "../tools/codeGenSettings.js";
import stringTools from "../tools/stringTools.js";
import fflc from "../tools/fflcComponentNames.js";

import { getNameOfFieldSchemaNamesAttribute } from "./generateFieldSchemaNamesAttribute.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getMethodName() {
	return fflc.getFieldsMethodNameOfTraceableRecordClass;
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const fieldSchemaNames = getFieldSchemaNamesAttributeName();

	const statements = [
		`public ${methodHeader} {`,
		`  return ${fieldSchemaNames};`,
		"}"
	]

	return stringTools.convertToSourceCode(statements);
}

function getMethodHeader() {
	const methodName = getMethodName();

	return `List<Schema.SObjectField> ${methodName}()`;
}

function getFieldSchemaNamesAttributeName() {
	return getNameOfFieldSchemaNamesAttribute();
}
export { 
	generateConstructorWithSObjectMethod,
	generateConstructorWithSObjectMethodHeader
}

function generateConstructorWithSObjectMethod(sObjectApiName) {
	setInternals(sObjectApiName);

	const name = getMethodName();
	const sourceCode = getSourceCode();

	return {
		name,
		type: cgs.fragmentTypes.traceableRecordConstructorWithSObjectMethod,
		sourceCode
	}
}

function generateConstructorWithSObjectMethodHeader(sObjectApiName) {
	setInternals(sObjectApiName);

	const name = getMethodName();
	const sourceCode = getMethodHeader();

	return {
		name,
		type: cgs.fragmentTypes.traceableRecordConstructorWithSObjectMethodHeader,
		sourceCode
	}
}

import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";

import { getTraceableRecordClassName } from "./generateTraceableRecordClass.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getMethodName() {
	return getTraceableRecordClassName(sObjectSpec.apiName);
}

function getSourceCode() {
	const methodHeader = getMethodHeader();
	const recordArgumentName = getRecordArgumentName();

	const statements = [
		`public ${methodHeader} {`,
		`  super(${recordArgumentName});`,
		"}"
	];

	return stringTools.convertToSourceCode(statements);
}

function getMethodHeader() {
	const methodName = getMethodName();
	const recordArgumentType = getRecordArgumentType();
	const recordArgumentName = getRecordArgumentName();

	return `${methodName}(${recordArgumentType} ${recordArgumentName})`
}

function getRecordArgumentType() {
	return sObjectSpec.apiName;
}

function getRecordArgumentName() {
	const singularName = stringTools.lowerCaseFirstLetter(sObjectSpec.singularName);

	return `${singularName}Record`;
}
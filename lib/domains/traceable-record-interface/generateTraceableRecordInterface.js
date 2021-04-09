import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";

import { generateHasChangedMethodHeader } from "../traceable-record/generateHasChangedMethodHeader.js";
import { generateHasNotChangedMethodHeader } from "../traceable-record/generateHasNotChangedMethodHeader.js";
import { generateGetOldFieldValueMethodHeader } from "../traceable-record/generateGetOldFieldValueMethod.js";
import { generateGetFieldValueMethodHeader } from "../traceable-record/generateGetFieldValueMethod.js";
import { generateSetFieldValueMethodHeader } from "../traceable-record/generateSetFieldValueMethod.js";
import { generateResetFieldValueMethodHeader } from "../traceable-record/generateResetFieldValueMethod.js";
import { generateClearFieldValueMethodHeader } from "../traceable-record/generateClearFieldValueMethod.js";
import { generateFieldHadValueMethodHeader } from "../traceable-record/generateFieldHadValueMethod.js";
import { generateFieldHasValueMethodHeader } from "../traceable-record/generateFieldHasValueMethod.js";
import { generateFieldDidNotHaveValueMethodHeader } from "../traceable-record/generateFieldDidNotHaveValueMethod.js";
import { generateFieldDoesNotHaveValueMethodHeader } from "../traceable-record/generateFieldDoesNotHaveValueMethod.js";
import { generateFieldHasChangedMethodHeader } from "../traceable-record/generateFieldHasChangedMethod.js";
import { generateFieldHasNotChangedMethodHeader } from "../traceable-record/generateFieldHasNotChangedMethod.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getTraceableRecordInterfaceName(sObjectApiName) {
	setInternals(sObjectApiName);

	return getInterfaceName();
}

function getInterfaceName() {
	return `ITraceable${stringTools.upperCaseFirstLetter(sObjectSpec.singularName)}`;
}

function getInterfaceContent() {
	const { apiName: sObjectApiName } = sObjectSpec;

	const standardInterfaceMembers = [
			generateHasChangedMethodHeader(sObjectApiName),
			generateHasNotChangedMethodHeader(sObjectApiName)
	];

	const standardInterfaceMembersBasedOnFields = cgs.getFieldApiNames(sObjectSpec.apiName).map(fieldApiName => [
			generateGetOldFieldValueMethodHeader(sObjectApiName, fieldApiName),
			generateGetFieldValueMethodHeader(sObjectApiName, fieldApiName),
			generateSetFieldValueMethodHeader(sObjectApiName, fieldApiName),
			generateResetFieldValueMethodHeader(sObjectApiName, fieldApiName),
			generateClearFieldValueMethodHeader(sObjectApiName, fieldApiName),
			generateFieldHadValueMethodHeader(sObjectApiName, fieldApiName),
			generateFieldHasValueMethodHeader(sObjectApiName, fieldApiName),
			generateFieldDidNotHaveValueMethodHeader(sObjectApiName, fieldApiName),
			generateFieldDoesNotHaveValueMethodHeader(sObjectApiName, fieldApiName),
			generateFieldHasChangedMethodHeader(sObjectApiName, fieldApiName),
			generateFieldHasNotChangedMethodHeader(sObjectApiName, fieldApiName),
	]).flat();

	const interfaceMembers = [
			...standardInterfaceMembers,
			...standardInterfaceMembersBasedOnFields
	];

	//interfaceMembers.sort(sortInterfaceMembers);

	return interfaceMembers.map(interfaceMember => `${interfaceMember.sourceCode};`);
}

function getSourceCode() {
	const interfaceName = getInterfaceName();
	const interfaceContent = getInterfaceContent();

	const statements = [
		`public interface ${interfaceName} {`,
		...interfaceContent,
		'}'
	]

	return stringTools.convertToSourceCode(statements);
}

function generateTraceableRecordInterface(sObjectApiName) {
	setInternals(sObjectApiName);

	const interfaceName = getInterfaceName();
	const sourceCode = getSourceCode();

	return {
		name: interfaceName,
		sourceCode,
		type: cgs.fragmentTypes.traceableRecordClass
	};
}

export {
	generateTraceableRecordInterface,
	getTraceableRecordInterfaceName
}
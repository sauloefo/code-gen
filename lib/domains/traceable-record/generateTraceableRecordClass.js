export {
	generateTraceableRecordClass,
	getTraceableRecordClassName
}

function generateTraceableRecordClass(sObjectApiName) {
	setInternals(sObjectApiName);

	const className = getClassName();
	const superClass = getSuperClassName();
	const classContent = getClassContent();
	const sourceCode = `public class ${className} extends ${superClass} {${classContent}\n}`;

	return {
		name: className,
		sourceCode,
		type: cgs.fragmentTypes.traceableRecordClass
	};
}

function getTraceableRecordClassName(sObjectApiName) {
	setInternals(sObjectApiName);

	return getClassName();
}

import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";
import fflc from "../../tools/fflcComponentNames.js";

import { generateConstructorWithSObjectMethod } from "./generateConstructorWithSObjectMethod.js";
import { generateGetOldFieldValueMethod } from "./generateGetOldFieldValueMethod.js";
import { generateGetFieldValueMethod } from "./generateGetFieldValueMethod.js";
import { generateSetFieldValueMethod } from "./generateSetFieldValueMethod.js";
import { generateResetFieldValueMethod } from "./generateResetFieldValueMethod.js";
import { generateClearFieldValueMethod } from "./generateClearFieldValueMethod.js";
import { generateFieldHadValueMethod } from "./generateFieldHadValueMethod.js";
import { generateFieldHasValueMethod } from "./generateFieldHasValueMethod.js";
import { generateFieldDidNotHaveValueMethod } from "./generateFieldDidNotHaveValueMethod.js";
import { generateFieldDoesNotHaveValueMethod } from "./generateFieldDoesNotHaveValueMethod.js";
import { generateFieldHasChangedMethod } from "./generateFieldHasChangedMethod.js";
import { generateFieldHasNotChangedMethod } from "./generateFieldHasNotChangedMethod.js";
import { generateFieldSchemaNamesAttribute } from "./generateFieldSchemaNamesAttribute.js";
import { generateGetFieldsMethod } from "./generateGetFieldsMethod.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getSuperClassName() {
	return fflc.traceableRecordClass;
}

function getClassName() {
	return `Traceable${stringTools.upperCaseFirstLetter(sObjectSpec.singularName)}`;
}

function getClassContent() {
	const { apiName: sObjectApiName } = sObjectSpec;

	const standardClassMembers = [
			generateFieldSchemaNamesAttribute(sObjectApiName),
			generateConstructorWithSObjectMethod(sObjectApiName),
			generateGetFieldsMethod(sObjectApiName)
	];

	const standardClassMembersBasedOnFields = cgs.getFieldApiNames(sObjectSpec.apiName).map(fieldApiName => [
			generateGetOldFieldValueMethod(sObjectApiName, fieldApiName),
			generateGetFieldValueMethod(sObjectApiName, fieldApiName),
			generateSetFieldValueMethod(sObjectApiName, fieldApiName),
			generateResetFieldValueMethod(sObjectApiName, fieldApiName),
			generateClearFieldValueMethod(sObjectApiName, fieldApiName),
			generateFieldHadValueMethod(sObjectApiName, fieldApiName),
			generateFieldHasValueMethod(sObjectApiName, fieldApiName),
			generateFieldDidNotHaveValueMethod(sObjectApiName, fieldApiName),
			generateFieldDoesNotHaveValueMethod(sObjectApiName, fieldApiName),
			generateFieldHasChangedMethod(sObjectApiName, fieldApiName),
			generateFieldHasNotChangedMethod(sObjectApiName, fieldApiName),
	]).flat();

	const classMembers = [
			...standardClassMembers,
			...standardClassMembersBasedOnFields
	];

	//classMembers.sort(sortClassMembers);

	return classMembers.map(classMember => classMember.sourceCode).join("\n");
}
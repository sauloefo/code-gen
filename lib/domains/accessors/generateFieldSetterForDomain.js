import cgs from "../../tools/codeGenSettings.js";
import stringTools from "../../tools/stringTools.js";

let sObjectApiNameArg, fieldApiNameArg, fieldSpec;

function setInternals(sObjectApiName, fieldApiName) {
	sObjectApiNameArg = sObjectApiName;
	fieldApiNameArg = fieldApiName;
	fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiName, fieldApiName);
}

function getDomainInterfaceName() {
	return cgs.getDomainInterfaceName(sObjectApiNameArg);
}

function getSetterMethodName() {
	return `set${stringTools.upperCaseFirstLetter(fieldSpec.singularName)}`;
}

function getArgumentName() {
	return `new${stringTools.upperCaseFirstLetter(fieldSpec.singularName)}`;
}

function getArgumentDataType() {
	return fieldSpec.dataType;
}

function generateHeader() {
	const returnType = getDomainInterfaceName();
	const setterName = getSetterMethodName();
	const argumentDataType = getArgumentDataType();
	const argumentName = getArgumentName();

	return `${returnType} ${setterName}(${argumentDataType} ${argumentName})`;
}

function generateFieldSetterHeader(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = generateHeader();
	const methodName = getSetterMethodName();

	return cgs.generateDomainSetterMethodHeader(sourceCode, methodName, fieldApiName);
}

function generateFieldSetterForDomain(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const argumentName = getArgumentName();
	const fieldName = cgs.getSchemaFieldName(sObjectApiName, fieldApiName);
	const methodHeader = generateHeader();

	const sourceCode = `public ${methodHeader}{setField(${fieldName},${argumentName});\nreturn this;}`;

	const methodName = getSetterMethodName();

	return cgs.generateDomainSetterMethod(sourceCode, methodName, fieldApiName);
}

export { 
	generateFieldSetterForDomain,
	generateFieldSetterHeader
};
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

function generateSignature() {
	const returnType = getDomainInterfaceName();
	const setterName = getSetterMethodName();
	const argumentDataType = getArgumentDataType();
	const argumentName = getArgumentName();

	return `${returnType} ${setterName}(${argumentDataType} ${argumentName})`;
}

function generateSetterSignature(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = generateSignature();

	return cgs.createDomainSetterMethodSignatureSourceCodeSpec(sourceCode, fieldApiName);
}

function generateFieldSetterForDomain(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const argumentName = getArgumentName();
	const fieldName = cgs.getFieldName(sObjectApiName, fieldApiName);
	const methodSignature = generateSignature();

	const sourceCode = `public ${methodSignature}{setField(${fieldName},${argumentName});\nreturn this;}`;

	return cgs.createDomainSetterMethodSourceCodeSpec(sourceCode, fieldApiName);
}

export { generateFieldSetterForDomain, generateSetterSignature };
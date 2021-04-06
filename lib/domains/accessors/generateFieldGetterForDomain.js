import stringTools from "../../tools/stringTools.js";
import cgs from "../../tools/codeGenSettings.js";

let sObjectApiNameArg, fieldApiNameArg, fieldSpec;

function setInternals(sObjectApiName, fieldApiName) {
	sObjectApiNameArg = sObjectApiName;
	fieldApiNameArg = fieldApiName;
	fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiNameArg,fieldApiNameArg);
}

function getMethodName() {
	const pluralName = stringTools.upperCaseFirstLetter(fieldSpec.pluralName);
	return `get${pluralName}`;
}

function getReturnType() {
	return `Set<${fieldSpec.dataType}>`;
}

function getGetFieldValueMethodName() {
	return `getFieldValuesAsSetOf${fieldSpec.dataType}`;
}

function generateSignature() {
	const methodName = getMethodName();
	const returnType = getReturnType();

	return `${returnType} ${methodName}()`;
}

function generateGetterSignature(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = generateSignature();

	return cgs.createDomainGetterMethodSignatureSourceCodeSpec(sourceCode, fieldApiName);
}

function generateFieldGetterForDomain (sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const fieldName = cgs.getFieldName(sObjectApiName, fieldApiName);
	const getFieldValueMethodName = getGetFieldValueMethodName();
	const methodSignature = generateSignature();

	const sourceCode = `public ${methodSignature}{return ${getFieldValueMethodName}(${fieldName});}`;

	return cgs.createDomainGetterMethodSourceCodeSpec(sourceCode, fieldApiName);
}

export {
	generateFieldGetterForDomain,
	generateGetterSignature
};
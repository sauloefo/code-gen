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

function generateFieldGetterSignature(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const sourceCode = generateSignature();
	const methodName = getMethodName();

	return cgs.generateDomainGetterSignature(sourceCode, methodName, fieldApiName);
}

function generateFieldGetterForDomain (sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const fieldName = cgs.getFieldName(sObjectApiName, fieldApiName);
	const getFieldValueMethodName = getGetFieldValueMethodName();
	const methodName = getMethodName();
	const methodSignature = generateSignature();

	const sourceCode = `public ${methodSignature}{return ${getFieldValueMethodName}(${fieldName});}`;

	return cgs.generateDomainGetterMethod(sourceCode, methodName, fieldApiName);
}

export {
	generateFieldGetterForDomain,
	generateFieldGetterSignature
};
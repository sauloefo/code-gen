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

	return generateSignature();
}

function generateFieldGetterForDomain (sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const fieldName = cgs.getFieldName(sObjectApiName, fieldApiName);
	const getFieldValueMethodName = getGetFieldValueMethodName();
	const methodSignature = generateSignature();

	return `public ${methodSignature}{return ${getFieldValueMethodName}(${fieldName});}`;
}

export {
	generateFieldGetterForDomain,
	generateGetterSignature
};
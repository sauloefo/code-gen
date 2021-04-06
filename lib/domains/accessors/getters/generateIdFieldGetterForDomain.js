import stringTools from "../../../tools/stringTools.js";
import cgs from "../../../tools/codeGenSettings.js";

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

function generateIdFieldGetterForDomain (sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const methodName = getMethodName();
	const fieldName = cgs.getFieldName(sObjectApiName, fieldApiName);
	const returnType = getReturnType();
	const getFieldValueMethodName = getGetFieldValueMethodName();

	return `public ${returnType} ${methodName}(){return ${getFieldValueMethodName}(${fieldName});}`;
}

export default generateIdFieldGetterForDomain;
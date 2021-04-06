import cgs from "../../../tools/codeGenSettings.js";
import stringTools from "../../../tools/stringTools.js";

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

function generateIdFieldSetterForDomain(sObjectApiName, fieldApiName) {
	setInternals(sObjectApiName, fieldApiName);

	const domainInterfaceName = getDomainInterfaceName();
	const setterName = getSetterMethodName();
	const argumentName = getArgumentName();
	const fieldName = cgs.getFieldName(sObjectApiName, fieldApiName);

	return `public ${domainInterfaceName} ${setterName}(Id ${argumentName}){setField(${fieldName},${argumentName});return this;}`;
}

export default generateIdFieldSetterForDomain;
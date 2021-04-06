import stringTools from "../../../tools/stringTools.js";

function generateIdFieldGetterForDomain (sObjectApiName, fieldSpec) {
	const fieldPluralName = stringTools.upperCaseFirstLetter(fieldSpec.fieldPluralName);
	const fieldApiName = fieldSpec.apiName;

	return `public Set<Id> get${fieldPluralName}(){return getIdFieldValues(${sObjectApiName}.${fieldApiName});}`;
}

export default generateIdFieldGetterForDomain;
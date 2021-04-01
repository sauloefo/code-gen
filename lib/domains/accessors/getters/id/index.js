import upperCaseFirstLetter from "../../../../tools/upperCaseFirstLetter.js";

function generateIdFieldGetterForDomain (sObjectTypeName, fieldApiName, fieldPluralName) {
	return `public Set<Id> get${upperCaseFirstLetter(fieldPluralName)}{return getIdFieldValue(${sObjectTypeName}.${fieldApiName});}`;
}

export default generateIdFieldGetterForDomain;
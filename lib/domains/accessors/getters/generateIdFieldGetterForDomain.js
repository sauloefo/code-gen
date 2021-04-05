import md from "../../../tools/metadataSpec.js";
import upperCaseFirstLetter from "../../../tools/upperCaseFirstLetter.js";

function generateIdFieldGetterForDomain (sObjectApiName, fieldSpec) {
	const fieldPluralName = upperCaseFirstLetter(fieldSpec.fieldPluralName);
	const fieldApiName = fieldSpec.apiName;

	return `public Set<Id> get${fieldPluralName}(){return getIdFieldValue(${sObjectApiName}.${fieldApiName});}`;
}

export default generateIdFieldGetterForDomain;
import stringTools from "../../../tools/stringTools.js";
import cgs from "../../../tools/codeGenSettings.js";

function generateIdFieldGetterForDomain (sObjectApiName, fieldApiName) {
	const fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiName, fieldApiName);
	const pluralName = stringTools.upperCaseFirstLetter(fieldSpec.pluralName);

	return `public Set<Id> get${pluralName}(){return getIdFieldValues(${sObjectApiName}.${fieldApiName});}`;
}

export default generateIdFieldGetterForDomain;
import stringTools from "../../../tools/stringTools.js";
import cgs from "../../../tools/codeGenSettings.js";

function generateIdFieldGetterForDomain (sObjectApiName, fieldApiName) {
	const fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiName, fieldApiName);
	const fieldPluralName = stringTools.upperCaseFirstLetter(fieldSpec.fieldPluralName);

	return `public Set<Id> get${fieldPluralName}(){return getIdFieldValues(${sObjectApiName}.${fieldApiName});}`;
}

export default generateIdFieldGetterForDomain;
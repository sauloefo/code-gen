import cgs from "../../tools/codeGenSettings.js";
import { generateFieldGetterForDomain } from "./generateFieldGetterForDomain.js";
import { generateFieldSetterForDomain } from "./generateFieldSetterForDomain.js";

function generateFieldAccessorsForFieldType(sObjectApiName,fieldType) {
	const fieldSpecs = cgs.selectFieldSpecByFieldType(sObjectApiName, fieldType);

	if (fieldSpecs.length === 0) return [];

	return fieldSpecs
			.map(fieldSpec => fieldSpec.apiName)
			.map(fieldApiName => [
					generateFieldGetterForDomain(sObjectApiName, fieldApiName),
					generateFieldSetterForDomain(sObjectApiName, fieldApiName)
			])
			.flat();
}

export { generateFieldAccessorsForFieldType };
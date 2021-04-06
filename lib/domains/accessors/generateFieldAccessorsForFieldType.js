import cgs from "../../tools/codeGenSettings.js";
import generateFieldGetterForDomain from "./generateFieldGetterForDomain.js";
import generateFieldSetterForDomain from "./generateFieldSetterForDomain.js";

function generateFieldAccessorsForFieldType(sObjectApiName,fieldType) {
	const idFieldSpecs = cgs.selectFieldSpecByFieldType(sObjectApiName, fieldType);

	if (idFieldSpecs.length === 0) return "";

	return idFieldSpecs
			.map(idFieldSpec => idFieldSpec.apiName)
			.map(fieldApiName => {
					const getter = generateFieldGetterForDomain(sObjectApiName, fieldApiName);
					const setter = generateFieldSetterForDomain(sObjectApiName, fieldApiName);

					return `${getter}\n${setter}`;
			})
			.join();
}

export { generateFieldAccessorsForFieldType };
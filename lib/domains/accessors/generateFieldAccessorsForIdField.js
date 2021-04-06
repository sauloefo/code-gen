import sfdc from "../../tools/sfdcMetadata.js";
import cgs from "../../tools/codeGenSettings.js";
import generateIdFieldGetterForDomain from "./getters/generateIdFieldGetterForDomain.js";
import generateIdFieldSetterForDomain from "./setters/generateIdFieldSetterForDomain.js";

function generateFieldAccessorsForIdFields(sObjectApiName) {
	const idFieldSpecs = cgs.selectFieldSpecByFieldType(sObjectApiName, sfdc.fieldTypes.Id);

	if (idFieldSpecs.length === 0) return "";

	return idFieldSpecs
			.map(idFieldSpec => idFieldSpec.apiName)
			.map(fieldApiName => {
					const getter = generateIdFieldGetterForDomain(sObjectApiName, fieldApiName);
					const setter = generateIdFieldSetterForDomain(sObjectApiName, fieldApiName);

					return `${getter}\n${setter}`;
			})
			.join();
}

export { generateFieldAccessorsForIdFields };
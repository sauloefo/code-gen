import sfdc from "../../tools/sfdcMetadata.js";
import cgs from "../../tools/codeGenSettings.js";

import { generateFieldGetterHeader } from "../accessors/generateFieldGetterForDomain.js";
import { generateFieldSetterHeader } from "../accessors/generateFieldSetterForDomain.js";

let sObjectSpec;

function setInternals(sObjectApiName) {
	sObjectSpec = cgs.selectSObjectSpec(sObjectApiName);
}

function getInterfaceName() {
	return cgs.getDomainInterfaceName(sObjectSpec.apiName);
}

function getMembersBasedOnIdField() {
	const sObjectApiName = sObjectSpec.apiName;
	const idFieldSpecs = cgs.selectFieldSpecByFieldType(sObjectApiName, sfdc.fieldTypes.Id);

	if (idFieldSpecs.length === 0) return [];

	return [
		...idFieldSpecs.map(fieldSpec => generateFieldGetterHeader(sObjectApiName, fieldSpec.apiName)),
		...idFieldSpecs.map(fieldSpec => generateFieldSetterHeader(sObjectApiName, fieldSpec.apiName))
	]
}

function getInterfaceMembers() {
	return [
		...getMembersBasedOnIdField()
	];
}

function createInterfaceContent(interfaceMembers) {
	return interfaceMembers.map(interfaceMember => interfaceMember.sourceCode).join(";\n") + ";";
}

function generateDomainInterface(sObjectApiName) {
	setInternals(sObjectApiName);

	const interfaceName = getInterfaceName();

	const interfaceMembers = getInterfaceMembers();
	//interfaceMembers.sort(sortInterfaceMembers);

	const interfaceContent = createInterfaceContent(interfaceMembers);
	const sourceCode = `public interface ${interfaceName} {${interfaceContent}}`;

	return cgs.generateDomainInterface(sourceCode, interfaceName);
}

export { generateDomainInterface };
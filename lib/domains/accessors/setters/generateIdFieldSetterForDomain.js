import cgs from "../../../tools/codeGenSettings.js";
import stringTools from "../../../tools/stringTools.js";

function generateIdFieldSetterForDomain(sObjectApiName, fieldApiName) {
	const domainInterfaceName = cgs.getDomainInterfaceName(sObjectApiName);
	
	const fieldSpec = cgs.selectFieldSpecByApiName(sObjectApiName, fieldApiName);
	const setterName = `set${stringTools.upperCaseFirstLetter(fieldSpec.singularName)}`;
	const argumentName = `new${stringTools.upperCaseFirstLetter(fieldSpec.singularName)}`;

	return `public ${domainInterfaceName} ${setterName}(Id ${argumentName}){setIdField(${sObjectApiName}.${fieldApiName},${argumentName});return this;}`;
}

export default generateIdFieldSetterForDomain;
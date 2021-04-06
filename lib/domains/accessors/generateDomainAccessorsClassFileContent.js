import sfdc from "../../tools/sfdcMetadata.js";
import sflc from "../../tools/sflcComponentNames.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateFieldAccessorsForFieldType } from "./generateFieldAccessorsForFieldType.js";

function generateFieldAccessors(sObjectApiName) {
	// const x = cgs.getFieldTypesFromFieldSpecs(sObjectApiName);
	// const y = x.map(fieldType => generateFieldAccessorsForFieldType(sObjectApiName, fieldType));
	// const z = y.join("\n");
	// return z;

	return cgs.getFieldTypesFromFieldSpecs(sObjectApiName)
			.map(fieldType => generateFieldAccessorsForFieldType(sObjectApiName, fieldType))
			.join("\n");
}

function generateDomainAccessorsClass (sObjectApiName) {
	const className = cgs.getDomainAccessorsClassName(sObjectApiName);
	const superClassName = sflc.baseDomainClass;

	const idFieldAccessors = generateFieldAccessors(sObjectApiName);

	return `public abstract class ${className} extends ${superClassName} {${idFieldAccessors}}`;
}

export default generateDomainAccessorsClass;
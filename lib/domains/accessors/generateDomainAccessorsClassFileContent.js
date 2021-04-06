import sflc from "../../tools/sflcComponentNames.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateFieldAccessorsForIdFields } from "./generateFieldAccessorsForIdField.js";

function generateFieldAccessors(sObjectApiName) {
	return generateFieldAccessorsForIdFields(sObjectApiName);
}

function generateDomainAccessorsClass (sObjectApiName) {
	const className = cgs.getDomainAccessorsClassName(sObjectApiName);
	const superClassName = sflc.baseDomainClass;

	const idFieldAccessors = generateFieldAccessors(sObjectApiName);

	return `public abstract class ${className} extends ${superClassName} {${idFieldAccessors}}`;
}

export default generateDomainAccessorsClass;
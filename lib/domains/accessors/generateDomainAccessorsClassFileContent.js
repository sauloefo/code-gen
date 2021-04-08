import fflc from "../../tools/fflcComponentNames.js";
import cgs from "../../tools/codeGenSettings.js";
import { generateFieldAccessorsForFieldType } from "./generateFieldAccessorsForFieldType.js";

let sObjectApiNameArg;

function setInternals(sObjectApiName) {
	sObjectApiNameArg = sObjectApiName;
}

function generateFieldAccessors() {
	return cgs.getFieldTypesFromFieldSpecs(sObjectApiNameArg)
			.map(fieldType => generateFieldAccessorsForFieldType(sObjectApiNameArg, fieldType))
			.flat();
}

function sortClassMembers(memberA, memberB) {
	const memberAIsNeitherGetterNorSetterMethod = memberA.sourceCodeType !== cgs.sourceCodeTypes.domainGetterMethod 
			&& memberA.sourceCodeType !== cgs.sourceCodeTypes.domainSetterMethod;

	const memberBIsNeitherGetterNorSetterMethod = memberB.sourceCodeType !== cgs.sourceCodeTypes.domainGetterMethod 
			&& memberB.sourceCodeType !== cgs.sourceCodeTypes.domainSetterMethod;

	if (memberAIsNeitherGetterNorSetterMethod || memberBIsNeitherGetterNorSetterMethod) return 0;

	if (memberA.relatedFieldApiName < memberB.relatedFieldApiName) return -1;

	if (memberA.relatedFieldApiName > memberB.relatedFieldApiName) return 1;

	if (memberA.sourceCodeType === memberB.sourceCodeType) {
		throw Error(`Two "${memberA.sourceCodeType}" source code specs related to field "${memberA.relatedFieldApiName}" `
				+ `should never exist in a DomainAccessor class for "${sObjectApiNameArg}" SObject type.`
		);
	}

	if (memberA.sourceCodeType === cgs.sourceCodeTypes.domainGetterMethod) return -1;

	return 1;
}

function getClassContent() {
	const fieldAccessors = generateFieldAccessors();

	const classMembers = [
		...fieldAccessors
	];

	classMembers.sort(sortClassMembers);

	return classMembers
			.map(classMember => classMember.sourceCode)
			.join("\n");
}

function getClassName() {
	return cgs.getDomainAccessorsClassName(sObjectApiNameArg);
}

function getSuperClassName() {
	return fflc.baseDomainClass;
}

function generateDomainAccessorsClass (sObjectApiName) {
	setInternals(sObjectApiName);

	const className = getClassName();
	const superClassName = getSuperClassName();
	const classContent = getClassContent();

	return `public abstract class ${className} extends ${superClassName} {${classContent}}`;
}

export default generateDomainAccessorsClass;